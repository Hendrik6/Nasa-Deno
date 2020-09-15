FROM hayd/deno:alpine-1.1.1

WORKDIR /NASA-DENO

COPY . .

USER deno

CMD ["run", "--allow-net", "--allow-read", "mod.ts"]

EXPOSE 8080