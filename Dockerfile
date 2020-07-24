FROM hayd/deno:latest

EXPOSE 8000

WORKDIR /app

CMD ["run", "--allow-net", "--allow-read", "main.ts"]
