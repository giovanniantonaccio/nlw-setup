import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = fastify();

app.register(cors);
app.register(appRoutes);

app.listen(
  {
    port: 3333,
  },
  () => console.log("Server started at port 3333...")
);
