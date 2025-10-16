import React, { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext.jsx";
import { TextField, Button, MenuItem, Grid, Alert } from "@mui/material";

const API_KEY = "6e2f6b1c3a7c47068ac36257dfc6bc8f";

const platforms = [
  { label: "Todos", value: "" },
  { label: "PC", value: "4" },
  { label: "PlayStation", value: "18" },
  { label: "Xbox", value: "1" },
  { label: "Nintendo", value: "7" }
];

const genres = [
  { label: "Todos", value: "" },
  { label: "Ação", value: "action" },
  { label: "Aventura", value: "adventure" },
  { label: "RPG", value: "role-playing-games-rpg" },
  { label: "Estratégia", value: "strategy" }
];

export default function SearchBar() {
  const { state, dispatch } = useContext(GameContext);
  const [validationError, setValidationError] = useState("");

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FILTERS", payload: { [field]: value } });
    if (validationError) setValidationError(""); // limpa erro se o usuário digitar
  };

  const handleSearch = async () => {
    if (!state.filters.query.trim()) {
      setValidationError("Por favor, digite o nome de um jogo para buscar.");
      return;
    }

    dispatch({ type: "FETCH_START" });
    setValidationError(""); // limpa erro de validação

    const { query, platform, genre, year } = state.filters;
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`;
    if (platform) url += `&platforms=${platform}`;
    if (genre) url += `&genres=${genre}`;
    if (year) url += `&dates=${year}-01-01,${year}-12-31`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        dispatch({ type: "FETCH_ERROR", payload: "Nenhum jogo encontrado." });
      } else {
        dispatch({ type: "FETCH_SUCCESS", payload: data.results });
      }
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: "Erro ao buscar jogos." });
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Buscar jogo"
            fullWidth
            value={state.filters.query}
            onChange={(e) => handleChange("query", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            select
            label="Plataforma"
            fullWidth
            value={state.filters.platform}
            onChange={(e) => handleChange("platform", e.target.value)}
          >
            {platforms.map((p) => (
              <MenuItem key={p.value} value={p.value}>
                {p.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            select
            label="Gênero"
            fullWidth
            value={state.filters.genre}
            onChange={(e) => handleChange("genre", e.target.value)}
          >
            {genres.map((g) => (
              <MenuItem key={g.value} value={g.value}>
                {g.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Ano"
            type="number"
            fullWidth
            value={state.filters.year}
            onChange={(e) => handleChange("year", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" onClick={handleSearch} fullWidth>
            Buscar
          </Button>
        </Grid>
      </Grid>

      {/* Exibe mensagem de erro de validação se houver */}
      {validationError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {validationError}
        </Alert>
      )}
    </>
  );
}
