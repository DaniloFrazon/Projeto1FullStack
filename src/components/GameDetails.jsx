import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

const API_KEY = "6e2f6b1c3a7c47068ac36257dfc6bc8f";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const data = await res.json();
        setGame(data);
      } catch (err) {
        console.error("Erro ao carregar jogo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "50px auto" }} />;
  if (!game) return <Typography>Jogo não encontrado.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>{game.name}</Typography>
      <img
        src={game.background_image}
        alt={game.name}
        style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }}
      />
      <Typography variant="body1" gutterBottom>{game.description_raw}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        🏆 Avaliação: {game.rating} / 5
      </Typography>
      <Typography variant="body2" color="text.secondary">
        📅 Lançamento: {game.released}
      </Typography>

      <Button variant="contained" sx={{ mt: 3 }} component={Link} to="/">
        Voltar
      </Button>
    </Box>
  );
}
