// frontend-test-submission/src/components/LogButton.js
import React from "react";
import { Button } from "@mui/material";
import { log } from "../utils/log";

const LogButton = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbmlrZXQuMjJzY3NlMTAxMTk2N0BnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAxNTczMiwiaWF0IjoxNzUxMDE0ODMyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTdmZGYwNzAtMzE0ZC00ZTZkLTkyMDgtZDZjMTdhM2Y0ZDZjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5pa2V0IGt1bWFyIHRoYWt1ciIsInN1YiI6ImFkOTU0ZWM2LTNiMWUtNDllOC05Mzg4LWU0MTc0Yjc0NmI3ZiJ9LCJlbWFpbCI6ImFuaWtldC4yMnNjc2UxMDExOTY3QGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwibmFtZSI6ImFuaWtldCBrdW1hciB0aGFrdXIiLCJyb2xsTm8iOiIyMjEzMTAxMTg5NCIsImFjY2Vzc0NvZGUiOiJNdWFndnEiLCJjbGllbnRJRCI6ImFkOTU0ZWM2LTNiMWUtNDllOC05Mzg4LWU0MTc0Yjc0NmI3ZiIsImNsaWVudFNlY3JldCI6IlBjVVZNTmJGamVHU01OVFIifQ.KDcil4nBhC_6zxjBT8U8GI1dKcMCueaBlYz9VPR_REw";

  const handleClick = async () => {
    try {
      await log("frontend", "info", "component", "Log button clicked", token);
      alert("Log sent successfully ✅");
    } catch (err) {
      alert("❌ Logging failed.");
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Click to Log
    </Button>
  );
};

export default LogButton;
