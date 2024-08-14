use actix_web::web;

use crate::{
    chat::{chat_route, get_count},
    handlers::{auth_handler, task_handler},
};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(task_handler::create_task)
            // .service(task_handler::complete_task)
            .service(auth_handler::login)
            .route("/count", web::get().to(get_count))
            .route("/ws", web::get().to(chat_route)),
    );
}
