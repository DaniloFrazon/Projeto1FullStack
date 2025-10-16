import React from "react";
import { GameProvider } from "../contexts/GameContext.jsx";
import SearchBar from "./SearchBar.jsx";
import GameList from "./GameList.jsx";
import { Container, Typography, Box, keyframes } from "@mui/material";

// Animação suave do banner (fade + zoom leve)
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

function App() {
  return (
    <GameProvider>
      {/* Estrutura principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Banner animado */}
        <Box
          component="header"
          sx={{
            width: "100%",
            height: { xs: 150, md: 400 },
            backgroundImage: "url('/Banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0 0 12px 12px",
            animation: `${fadeIn} 1.2s ease-in-out`,
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
        />

        {/* Conteúdo principal */}
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            mt: 4,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            🎮 Buscador de Jogos
          </Typography>

          <SearchBar />
          <GameList />
        </Container>

        {/* Rodapé com gradiente e efeito neon leve */}
        <Box
          component="footer"
          sx={{
            width: "100%",
            background: "linear-gradient(90deg, #111 0%, #222 50%, #111 100%)",
            color: "#fff",
            textAlign: "center",
            py: 2,
            mt: "auto",
            borderTop: "2px solid #00bcd4",
            boxShadow: "0 -2px 10px rgba(0,188,212,0.2)",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              textShadow: "0 0 8px rgba(0,188,212,0.8)",
              letterSpacing: 0.5,
            }}
          >
            Powered By Danilo Augusto Martins Frazon
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            UTFPR - Cornélio Procópio
          </Typography>
        </Box>
      </Box>
    </GameProvider>
  );
}

export default App;
