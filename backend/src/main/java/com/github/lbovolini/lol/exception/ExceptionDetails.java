package com.github.lbovolini.lol.exception;

public class ExceptionDetails {
    private int status;
    private String message;
    private long timestamp;

    private ExceptionDetails() {}

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public long getTimestamp() {
        return timestamp;
    }


    public static final class Builder {
        private int status;
        private String message;
        private long timestamp;

        private Builder() {
        }

        public static Builder newBuilder() {
            return new Builder();
        }

        public Builder status(int status) {
            this.status = status;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder timestamp(long timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public ExceptionDetails build() {
            ExceptionDetails exceptionDetails = new ExceptionDetails();
            exceptionDetails.message = this.message;
            exceptionDetails.status = this.status;
            exceptionDetails.timestamp = this.timestamp;
            return exceptionDetails;
        }
    }
}
