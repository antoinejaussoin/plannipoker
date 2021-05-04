FROM rust:1.50 as build

# create a new empty shell project
RUN USER=root cargo new --bin plannipoker

WORKDIR /plannipoker

# copy over your manifests
COPY ./Cargo.toml ./Cargo.toml

# this build step will cache your dependencies
RUN cargo build --release
RUN rm src/*.rs

# copy your source tree
COPY ./src ./src
# COPY ./migrations ./migrations

# RUN cargo clean
RUN rm ./target/release/deps/plannipoker*

# build for release
RUN cargo build --release


# ---------------------------------------------------------------


FROM ubuntu:focal

RUN apt-get update && apt-get install -y libpq-dev && rm -rf /var/lib/apt/lists/*

# copy the build artifact from the build stage
COPY --from=build /plannipoker/target/release/plannipoker .
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

EXPOSE 3030

ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
ENV SSL_CERT_DIR=/etc/ssl/certs

CMD ["./plannipoker"]