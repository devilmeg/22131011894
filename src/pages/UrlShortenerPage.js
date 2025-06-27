import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper
} from "@mui/material";
import { log } from "../utils/log";
import { v4 as uuidv4 } from "uuid";

const UrlShortenerPage = () => {
  const [urls, setUrls] = useState([
    { longUrl: "", shortcode: "", validity: "", result: null, error: "" }
  ]);

  // Bearer token for logging
  const [token] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbmlrZXQuMjJzY3NlMTAxMTk2N0BnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAxNTczMiwiaWF0IjoxNzUxMDE0ODMyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTdmZGYwNzAtMzE0ZC00ZTZkLTkyMDgtZDZjMTdhM2Y0ZDZjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5pa2V0IGt1bWFyIHRoYWt1ciIsInN1YiI6ImFkOTU0ZWM2LTNiMWUtNDllOC05Mzg4LWU0MTc0Yjc0NmI3ZiJ9LCJlbWFpbCI6ImFuaWtldC4yMnNjc2UxMDExOTY3QGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwibmFtZSI6ImFuaWtldCBrdW1hciB0aGFrdXIiLCJyb2xsTm8iOiIyMjEzMTAxMTg5NCIsImFjY2Vzc0NvZGUiOiJNdWFndnEiLCJjbGllbnRJRCI6ImFkOTU0ZWM2LTNiMWUtNDllOC05Mzg4LWU0MTc0Yjc0NmI3ZiIsImNsaWVudFNlY3JldCI6IlBjVVZNTmJGamVHU01OVFIifQ.KDcil4nBhC_6zxjBT8U8GI1dKcMCueaBlYz9VPR_REw"
  );

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addMore = () => {
    if (urls.length < 5) {
      setUrls([
        ...urls,
        { longUrl: "", shortcode: "", validity: "", result: null, error: "" }
      ]);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortcode = () => uuidv4().slice(0, 6);

  const handleSubmit = async () => {
    const updated = await Promise.all(
      urls.map(async (item) => {
        let error = "";

        // URL validation
        if (!item.longUrl || !validateUrl(item.longUrl)) {
          error = "❌ Invalid URL";
          await log("frontend", "error", "component", "Invalid URL format", token);
          return { ...item, error };
        }

        const code = item.shortcode || generateShortcode();
        const validity = parseInt(item.validity) > 0 ? parseInt(item.validity) : 30;

        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + validity);

        const result = {
          short: `http://localhost:3000/${code}`,
          long: item.longUrl,
          expiresAt: expiry.toLocaleString()
        };

        await log(
          "frontend",
          "info",
          "component",
          `Shortened URL: ${item.longUrl} => ${code}`,
          token
        );

        return {
          ...item,
          shortcode: code,
          validity,
          result,
          error: ""
        };
      })
    );

    setUrls(updated);
    localStorage.setItem("urlData", JSON.stringify(updated));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        🔗 URL Shortener
      </Typography>

      {urls.map((item, index) => (
        <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Original URL"
                fullWidth
                value={item.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
                error={!!item.error}
                helperText={item.error}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Custom Shortcode (optional)"
                fullWidth
                value={item.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Validity in Minutes (optional)"
                type="number"
                fullWidth
                value={item.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
              />
            </Grid>

            {item.result && (
              <Grid item xs={12}>
                <Typography>
                  ✅ Short URL:{" "}
                  <a href={item.result.short} target="_blank" rel="noreferrer">
                    {item.result.short}
                  </a>
                  <br />
                  ⏳ Expires At: {item.result.expiresAt}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          🔐 Shorten URLs
        </Button>
        {urls.length < 5 && (
          <Button variant="outlined" onClick={addMore}>
            ➕ Add More
          </Button>
        )}
      </Box>

      <Box mt={3}>
        <Button
          variant="text"
          onClick={() => (window.location.href = "/stats")}
        >
          📊 View URL Stats
        </Button>
      </Box>
    </Container>
  );
};

export default UrlShortenerPage;
