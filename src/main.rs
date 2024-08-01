use std::env;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use actix_web::web::Data;
use dotenv::dotenv;


mod config;
mod db;
mod routes;
mod handlers;
mod models;
mod services;
mod utils;
mod schema;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = db::establish_connection(&database_url);

    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(pool.clone()))
            .configure(routes::init)
    })
        .bind("127.0.0.1:8080")?
        .run()
        .await
}



#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}