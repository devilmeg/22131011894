import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { log } from "../utils/log";

const UrlStatsPage = () => {
  const [data, setData] = useState([]);
  const [token] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbmlrZXQuMjJzY3NlMTAxMTk2N0BnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAxNTczMiwiaWF0IjoxNzUxMDE0ODMyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTdmZGYwNzAtMzE0ZC00ZTZkLTkyMDgtZDZjMTdhM2Y0ZDZjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5pa2V0IGt1bWFyIHRoYWt1ciIsInN1YiI6ImFkOTU0ZWM2LTNiMWUtNDllOC05Mzg4LWU0MTc0Yjc0NmI3ZiJ9LCJlbWFpbCI6ImFuaWtldC4yMnNjc2UxMDExOTY3QGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwibmFtZSI6ImFuaWtldCBrdW1hciB0aGFrdXIiLCJyb2xsTm8iOiIyMjEzMTAxMTg5NCIsImFjY2Vzc0NvZGUiOiJNdWFndnEiLCJjbGllbnRJRCI6ImFkOTU0ZWM2LTNiMWUtNDllOC05Mzg4LWU0MTc0Yjc0NmI3ZiIsImNsaWVudFNlY3JldCI6IlBjVVZNTmJGamVHU01OVFIifQ.KDcil4nBhC_6zxjBT8U8GI1dKcMCueaBlYz9VPR_REw"
  );

  useEffect(() => {
    const stored = localStorage.getItem("urlData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
        log("frontend", "info", "component", "Loaded stats from localStorage", token);
      } catch (err) {
        log("frontend", "error", "component", "Failed to parse localStorage stats", token);
      }
    } else {
      log("frontend", "warn", "component", "No stats data found", token);
    }
  }, [token]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        📊 URL Statistics
      </Typography>

      {data.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        data.map((item, i) => (
          item.result && (
            <Paper key={i} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">🔗 Short URL:</Typography>
              <a href={item.result.short} target="_blank" rel="noreferrer">
                {item.result.short}
              </a>

              <Box mt={1}>
                <Typography>🌐 Original URL: {item.longUrl}</Typography>
                <Typography>⏳ Expires At: {item.result.expiresAt}</Typography>
                <Typography>📅 Created: {new Date().toLocaleString()}</Typography>
                <Typography>👁️‍🗨️ Clicks: (Simulated)</Typography>

                <ul style={{ marginTop: 4 }}>
                  <li>📍 India – 1:30 PM – from WhatsApp</li>
                  <li>📍 Germany – 2:15 PM – from Email</li>
                </ul>
              </Box>

              <Divider sx={{ mt: 2 }} />
            </Paper>
          )
        ))
      )}

      <Box mt={3}>
        <Button
          variant="outlined"
          onClick={() => (window.location.href = "/")}
        >
          🔙 Back to Shortener
        </Button>
      </Box>
    </Container>
  );
};

export default UrlStatsPage;
