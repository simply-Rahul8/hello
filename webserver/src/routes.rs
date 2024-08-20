use actix_web::web;

use crate::{
    chat::{chat_route, get_count},
    handlers::{auth_handler, task_handler},
};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/v1")
            .service(task_handler::create_task)
            .service(auth_handler::register),
    )
    .route("/count", web::get().to(get_count))
    .route("/ws", web::get().to(chat_route));
}
