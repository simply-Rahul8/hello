use actix_web::web;

use crate::{
    chat::{chat_route, get_count},
    handlers::{task_handler, user_handler},
};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/v1")
            .configure(task_routes)
            .configure(auth_routes)
            .route("/count", web::get().to(get_count))
            .route("/ws", web::get().to(chat_route)),
    );
}

fn task_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/tasks").service(task_handler::create_task));
}

fn auth_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .service(user_handler::register)
            .service(user_handler::login), // Add more auth-related routes here
    );
}
