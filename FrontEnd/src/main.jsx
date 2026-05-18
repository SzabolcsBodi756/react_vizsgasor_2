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

Ezek a kódok a backend-hez kellenek:

Program.cs:
﻿namespace GLS_CLI
{
    public class Program
    {

        public static List<AutoAdatok> lista = new List<AutoAdatok>();

        static void Main(string[] args)
        {

            Beolvas();

            NapAdatokSzama();

            SoforokSzama();

            HaviOsszesKilometer();

            AtlagosNapiFogyasztas();

            LegtobbetVezetettSofor();

        }

        public static void Beolvas()
        {

            StreamReader sr = new StreamReader("GLS.txt");

            while (!sr.EndOfStream)
            {

                lista.Add( new AutoAdatok( sr.ReadLine()));

            }

            sr.Close();
        }

        static void NapAdatokSzama()
        {

            Console.WriteLine("2. Feladat:");

            Console.WriteLine($"\tAz autó használatban töltött napjainak száma:{lista.Count()}");

        }

        static void SoforokSzama()
        {

            Console.WriteLine("3. Feladat:");

            Console.WriteLine($"\tKülönböző sofőrök száma: {lista.Select(x => x.SoforTeljesNeve).Distinct().Count()}");

        }

        static void HaviOsszesKilometer()
        {

            Console.WriteLine("4. Feladat:");

            Console.WriteLine($"\tAz összes megtett kilométer:{lista.Select(x => x.NapiKilometer).Sum()} km");

        }

        public static double AtlagosNapiFogyasztasKiszamitas(double fogyasztasLiter, double megtettKilometer)
        {

            if (fogyasztasLiter <= 0 || megtettKilometer <= 0)
            {

                return 0;

            }
            else
            {

                return fogyasztasLiter / (megtettKilometer / 100);

            }
        }

        static void AtlagosNapiFogyasztas()
        {

            Console.WriteLine("6. Feladat:");

            double osszFogyasztas = lista.Sum(x => x.NapiFogyasztas);

            double osszKm = lista.Sum(x => x.NapiKilometer);

            double atlag = AtlagosNapiFogyasztasKiszamitas(osszFogyasztas, osszKm);

            Console.WriteLine($"Átlagos fogyasztás: {atlag} liter/100 km");

        }

        static void LegtobbetVezetettSofor()
        {

            Console.WriteLine("7. Feladat:");

            Console.WriteLine($"A legtöbbet vezető sofőr: {lista.GroupBy(x => x.SoforTeljesNeve).OrderByDescending(g => g.Count()).First().Key}, napok száma: {lista.GroupBy(x => x.SoforTeljesNeve).OrderByDescending(g => g.Count()).First().Count()}");

        }
    }
}

Class.cs:
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GLS_CLI
{
    public class AutoAdatok
    {

        public DateTime Datum { get; private set; }
        public string SoforTeljesNeve { get; private set; }
        public int NapiKilometer { get; private set; }
        public int KezbesitettCsomagokSzama { get; private set; }
        public int NapiFogyasztas { get; private set; }

        public AutoAdatok(DateTime datum, string soforTeljesNeve, int napiKilometer, int kezbesitettCsomagokSzama, int napiFogyasztas)
        {
            Datum = datum;
            SoforTeljesNeve = soforTeljesNeve;
            NapiKilometer = napiKilometer;
            KezbesitettCsomagokSzama = kezbesitettCsomagokSzama;
            NapiFogyasztas = napiFogyasztas;
        }

        public AutoAdatok(string adatok)
        {

            string[] sor = adatok.Split(';');

            Datum = DateTime.Parse(sor[0]);
            SoforTeljesNeve = sor[1];
            NapiKilometer = int.Parse(sor[2]);
            KezbesitettCsomagokSzama = int.Parse(sor[3]);
            NapiFogyasztas = int.Parse(sor[4]);

        }
    }
}

ProgramTest.cs:
﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using GLS_CLI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.CodeAnalysis;

namespace GLS_CLI.Tests
{

    [TestClass()]
    public class ProgramTests
    {

        [TestMethod()]
        [DataRow(10, 100, 10)]
        [DataRow(16, 200, 8)]
        [DataRow(0, 0, 0)]

        public void AtlagosNapiFogyasztasKiszamitasTest(double liter, double kilometer, double elvart)
        {

            double eredmeny = Program.AtlagosNapiFogyasztasKiszamitas(liter, kilometer);

            Assert.AreEqual(elvart, eredmeny);

        }
    }
}

MainWindow.xaml:
﻿<Window x:Class="GLS_WPF.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:GLS_WPF"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800"
        Loaded="Window_Loaded">
    <Grid>

        <Grid.ColumnDefinitions>

            <ColumnDefinition Width="3*"/>

            <ColumnDefinition Width="2*"/>

        </Grid.ColumnDefinitions>

        <StackPanel Grid.Column="1" Orientation="Vertical">

            <Label Content="Dátom" Margin="5"/>

            <TextBox x:Name="datum" Margin="5"/>

            <Label Content="Név" Margin="5"/>

            <TextBox x:Name="nev" Margin="5"/>

            <Label Content="Csomagok száma" Margin="5"/>

            <TextBox x:Name="csomagSzam" Margin="5"/>

            <Label Content="Fogyasztás (l/100km)" Margin="5"/>

            <TextBox x:Name="fogasztas" Margin="5"/>

            <Label Content="km" Margin="5"/>

            <TextBox x:Name="km" Margin="5"/>

            <Button x:Name="btnFelvitel"  Content="Felvitel" Margin="5" Click="btnFelvitel_Click"/>

            <Button x:Name="btnModositas" Content="Módosítás" Margin="5" Click="btnModositas_Click"/>

            <Button x:Name="btnMentes" Content="Mentés" Margin="5" Click="btnMentes_Click"/>


        </StackPanel>

        <DataGrid x:Name="dtgAdatok" Grid.Column="0" ColumnWidth="*" SelectionChanged="dtgAdatok_SelectionChanged"/>


    </Grid>
</Window>

MainWindow.xaml.cs:
﻿using GLS_CLI;
using Microsoft.Win32;
using System.IO;
using System.Windows;
using System.Windows.Controls;

namespace GLS_WPF
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            Program.Beolvas();
            FrissitTabla();
        }

        private void FrissitTabla()
        {
            dtgAdatok.ItemsSource = null;
            dtgAdatok.ItemsSource = Program.lista;
        }

        private bool Validalas()
        {
            if (string.IsNullOrWhiteSpace(datum.Text) ||
                string.IsNullOrWhiteSpace(nev.Text) ||
                string.IsNullOrWhiteSpace(km.Text) ||
                string.IsNullOrWhiteSpace(csomagSzam.Text) ||
                string.IsNullOrWhiteSpace(fogasztas.Text))
            {
                return false;
            }

            if (!DateTime.TryParse(datum.Text, out _))
            {
                return false;
            }

            if (!int.TryParse(km.Text, out int kmErtek) || kmErtek <= 0)
            {
                return false;
            }

            if (!int.TryParse(csomagSzam.Text, out int csomagErtek) || csomagErtek <= 0)
            {
                return false;
            }

            if (!int.TryParse(fogasztas.Text, out int fogyasztasErtek) || fogyasztasErtek <= 0)
            {
                return false;
            }

            return true;
        }

        private void btnFelvitel_Click(object sender, RoutedEventArgs e)
        {
            if (!Validalas())
            {
                MessageBox.Show("Hibás vagy hiányzó adatok!", "Hiba");
                return;
            }

            DateTime ujDatum = DateTime.Parse(datum.Text);

            if (Program.lista.Any(x => x.Datum.Date == ujDatum.Date))
            {
                MessageBox.Show("Már rögzítettek adatot a kiválasztott dátumra!");
                return;
            }

            Program.lista.Add(new AutoAdatok(
                ujDatum,
                nev.Text,
                int.Parse(km.Text),
                int.Parse(csomagSzam.Text),
                int.Parse(fogasztas.Text)
            ));

            FrissitTabla();
        }

        private void btnModositas_Click(object sender, RoutedEventArgs e)
        {
            if (!Validalas())
            {
                MessageBox.Show("Hibás vagy hiányzó adatok!", "Hiba");
                return;
            }

            if (dtgAdatok.SelectedItem is not AutoAdatok kijelolt)
            {
                MessageBox.Show("Nincs kijelölt rekord!", "Hiba");
                return;
            }

            DateTime ujDatum = DateTime.Parse(datum.Text);

            if (Program.lista.Any(x => x != kijelolt && x.Datum.Date == ujDatum.Date))
            {
                MessageBox.Show("Már rögzítettek adatot a kiválasztott dátumra!");
                return;
            }

            int index = Program.lista.IndexOf(kijelolt);

            Program.lista[index] = new AutoAdatok(
                ujDatum,
                nev.Text,
                int.Parse(km.Text),
                int.Parse(csomagSzam.Text),
                int.Parse(fogasztas.Text)
            );

            FrissitTabla();
        }

        private void btnMentes_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                SaveFileDialog sfd = new SaveFileDialog();
                sfd.FileName = "gls.txt";
                sfd.Filter = "Szövegfájl (*.txt)|*.txt|Minden fájl (*.*)|*.*";

                if (sfd.ShowDialog() == true)
                {
                    using StreamWriter sw = new StreamWriter(sfd.FileName);

                    foreach (var item in Program.lista)
                    {
                        sw.WriteLine(item.ToString());
                    }

                    MessageBox.Show("Sikeres Mentés!");
                }
            }
            catch
            {
                MessageBox.Show("Hiba a mentés során!", "Hiba");
            }
        }

        private void dtgAdatok_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dtgAdatok.SelectedItem is AutoAdatok kijelolt)
            {

                datum.Text = kijelolt.Datum.ToString("yyyy.MM.dd");

                nev.Text = kijelolt.SoforTeljesNeve;

            }
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
