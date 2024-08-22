use diesel::backend::Backend;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");

pub type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub fn establish_connection(database_url: &str) -> DbPool {
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.")
}

pub fn run_migrations<DB: Backend>(
    connection: &mut impl MigrationHarness<DB>,
    migration: EmbeddedMigrations,
) -> Result<(), Box<dyn std::error::Error + Send + Sync + 'static>> {
    connection
        .run_pending_migrations(migration)
        .expect("Failed to run migrations");
    Ok(())
}
