package com.github.lbovolini.lol.handler;

import com.github.lbovolini.lol.exception.ExceptionDetails;
import com.github.lbovolini.lol.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionDetails> handleResourceNotFoundException(ResourceNotFoundException rnfe) {
        ExceptionDetails exceptionDetails = ExceptionDetails.Builder.newBuilder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(rnfe.getMessage())
                .timestamp(new Date().getTime())
                .build();
        return new ResponseEntity<>(exceptionDetails, HttpStatus.NOT_FOUND);
    }
}

