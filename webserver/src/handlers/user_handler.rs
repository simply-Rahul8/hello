use crate::{db::DbPool, handlers::auth_handler::LoginRequest, services::user_service};
use actix_web::{post, web, HttpResponse, Responder};

#[post("")]
pub async fn register(
    pool: web::Data<DbPool>,
    credentials: web::Json<LoginRequest>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection.");
    match user_service::register_user(&mut conn, &credentials.username, &credentials.password).await
    {
        Ok(user) => HttpResponse::Created().json(user),
        Err(error) => {
            log::error!("Failed to create new User: {:?}", error);
            HttpResponse::InternalServerError().json("Error creating new User")
        }
    }
}
