pub mod chat;
pub mod chat_server;

use std::{
    sync::atomic::{AtomicUsize, Ordering},
    time::Instant,
};

use actix::Addr;
use actix_web::{web, Error, HttpRequest, HttpResponse, Responder};
use actix_web_actors::ws;

pub async fn get_count(count: web::Data<AtomicUsize>) -> impl Responder {
    let current_count = count.load(Ordering::SeqCst);
    format!("Visitors: {current_count}")
}

pub async fn chat_route(
    req: HttpRequest,
    stream: web::Payload,
    srv: web::Data<Addr<chat_server::ChatServer>>,
) -> Result<HttpResponse, Error> {
    ws::start(
        chat::WsChatSession {
            id: 0,
            hb: Instant::now(),
            room: "main".to_owned(),
            name: None,
            addr: srv.get_ref().clone(),
        },
        &req,
        stream,
    )
}
