import "reflect-metadata";
import config from "./Configs/index";
import express from "express";
import Index from "./Loaders";

async function startServer() {
    const app : Index = new Index(express(),+config.port);
    await app.start();
};

startServer();