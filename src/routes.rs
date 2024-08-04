use actix_web::web;

use crate::handlers::{task_handler, auth_handler};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(task_handler::create_task)
            // .service(task_handler::complete_task)
            .service(auth_handler::login)
        ,
    );
}
