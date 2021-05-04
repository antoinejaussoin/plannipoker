

use actix_web::{App, HttpServer, HttpResponse, HttpRequest, get, Result};
use actix_web::http::{StatusCode};

#[get("/welcome")]
async fn welcome(req: HttpRequest) -> Result<HttpResponse> {
    println!("{:?}", req);

    // response
    Ok(HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body("ping"))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!(">> Welcome to Plannipoker <<");

    std::env::set_var("RUST_LOG", "actix_server=info,actix_web=info");
    std::fs::create_dir_all("./.tmp")?;

    println!("Server listening...");
    HttpServer::new(move || {
        App::new()
        .service(welcome)
        // .route("/again", web::get().to(index2))
    })
    .bind("0.0.0.0:3030")?
    .run()
    .await
}
