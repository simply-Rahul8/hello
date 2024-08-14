use actix::Actor;
use actix_cors::Cors;
use actix_files::{Files, NamedFile};
use actix_web::middleware::Logger;
use actix_web::web::{self, Data};
use actix_web::{App, HttpServer, Responder};
use chat::chat_server;
use config::Config;
use dotenv::dotenv;
use std::sync::atomic::AtomicUsize;
use std::sync::Arc;

mod chat;
mod config;
mod db;
mod handlers;
mod models;
mod routes;
mod schema;
mod services;
mod utils;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    dotenv().ok();

    let database_url = Config::from_env().database_url;
    let pool = db::establish_connection(&database_url);

    let app_state = Arc::new(AtomicUsize::new(0));

    // start chat server actor
    let server = chat_server::ChatServer::new(app_state.clone()).start();
    log::info!("starting HTTP server at http://localhost:8080");
    HttpServer::new(move || {
        let cors = Cors::permissive();

        App::new()
            .app_data(Data::new(pool.clone()))
            .configure(routes::init)
            .wrap(cors)
            .app_data(web::Data::from(app_state.clone()))
            .app_data(web::Data::new(server.clone()))
            .service(web::resource("/").to(index))
            .service(Files::new("/static", "./static"))
            .wrap(Logger::default())
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

async fn index() -> impl Responder {
    NamedFile::open_async("./static/index.html").await.unwrap()
}
