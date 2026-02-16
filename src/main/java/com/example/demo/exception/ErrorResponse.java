package com.example.demo.exception;

import java.time.LocalDateTime;

public record ErrorResponse(
        LocalDateTime localDateTime,
        int status,
        String error,
        String message,
        String path
) {}
