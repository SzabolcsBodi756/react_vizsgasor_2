import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)



















































/*
Ezek itt minta kódok az adatbázis tényleges létrehozásához:

CREATE DATABASE adatbazis_neve 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_hungarian_ci; 

CREATE TABLE books( 
    book_id int(11) PRIMARY KEY, 
    title varchar(200), 
    publish_date date, 
    author_id int(11), 
    category_id int(11), 

    CONSTRAINT authors 
    FOREIGN KEY (author_id) 
    REFERENCES authors(author_id) 
    ON DELETE CASCADE 
);

Ezek a kódok a mySQL feladathoz kellenek:

SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
JOIN Customers ON Orders.CustomerID=Customers.CustomerID;

SELECT DISTINCT Country FROM Customers;

SELECT * FROM Products
ORDER BY Price;

SELECT * FROM Customers
WHERE NOT Country = 'Germany';

SELECT column_name(s)
FROM table_name
WHERE condition
LIMIT number;

SELECT COUNT(*)
FROM Products;

SELECT column1, column2, ...
FROM table_name
WHERE columnN LIKE pattern;

SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;

SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);

SELECT column1, aggregate_function(column2), column3, ...
FROM table_name
WHERE condition
GROUP BY column1, column3
ORDER BY column_name;

Ezek a kódok a c# webAPI-hoz kellenek:

Program.cs:
using Microsoft.EntityFrameworkCore;
using Bódi_Szabolcs_backend.Models;
using System.Text.Json.Serialization;

namespace Bódi_Szabolcs_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.




            //ezt adtuk hozzá egyszer
            builder.Services
            .AddControllers()
            .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);



            //Ez kell még pluszban, hogy a rendszer még működjön + az appsetting.json-be kell még betenni a connection stringet
            builder.Services.AddDbContext<LibrarydbContext>(options =>
                options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));
            



            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(c => { c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()); });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();



            //ezt adtuk hozzá egyszer
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());



            app.MapControllers();

            app.Run();
        }
    }
}


Appsetting.json:
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  //ez kell ide, hogy működjön a rendszer (adatbázis nevét át kell írni)
  "ConnectionStrings": {
      "DefaultConnection": "server=localhost;database=cinemadb;user=root;password=;"
  },
  "AllowedHosts": "*"
}


BooksController.cs:
using Bódi_Szabolcs_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bódi_Szabolcs_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {

        private readonly LibrarydbContext _context;

        public BooksController(LibrarydbContext context)
        {

            _context = context;

        }

        [HttpGet("feladat10")]
        public async Task<ActionResult> Get()
        {
            var books = await _context.Books.ToListAsync();

            if (books != null)
            {

                return Ok(books);

            }

            Exception e = new();

            return BadRequest(e.Message);
        }


        [HttpPost("feladat13")]
        public async Task<ActionResult> AddNewBook(string id, Book book)
        {

            var builder = WebApplication.CreateBuilder();

            string uid = builder.Configuration.GetValue<string>("Code");

            if (uid == id)
            {
                var bk = new Book
                {

                    BookId = book.BookId,
                    Title = book.Title,
                    PublishDate = book.PublishDate,
                    AuthorId = book.AuthorId,
                    CategoryId = book.CategoryId
                };

                if (bk != null)
                {
                    await _context.Books.AddAsync(bk);
                    await _context.SaveChangesAsync();
                    return StatusCode(201, "Könyv hozzáadása sikeresen megtörtént.");
                }

                Exception e = new();

                return BadRequest(e.Message);
            }

            return StatusCode(401, "Nincs jogusltsága új könyv felviteléhez.");
        }
    }
}

Ezek a kódok a react-hoz kellenek:

//bun create vite

//Select a framework: React
//Select a variant: JavaScript
//Install with bun and start now? Yes

//ezt itt consol-ba
//bun add bootstrap
//bun add bootstrap-icons
//bun add react-router-dom
//bun add -d jsdom @testing-library/jest-dom 
*/
