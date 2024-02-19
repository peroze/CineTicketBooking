package com.unipi.CineTicketBooking.model;

import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.awt.*;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class PdfGeneration {



    public void generate(int id) {
        try {

            String name = "Anaximandos";
            String surname = "Partsanakis";
            String movie= "Maze Runner";
            String showtime="Monday 19/02/2024 20:40";
            String seat="13";
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(id + ".pdf"));
            document.open();
            Image img = Image.getInstance("FrontEnd/cine-ticket-booking-app/src/Components/Images/Logo.png");
            Font header1 = FontFactory.getFont(FontFactory.COURIER, 15, BaseColor.BLACK);
            Font header2 = FontFactory.getFont(FontFactory.COURIER_BOLD, 14, BaseColor.BLACK);
            Font p = FontFactory.getFont(FontFactory.COURIER, 12, BaseColor.BLACK);
            Font warn = FontFactory.getFont(FontFactory.COURIER_BOLD, 12, BaseColor.RED);
            Chunk chunk = new Chunk("Thank You " + name + ", for your Reservation", header1);
            Paragraph paragraph = new Paragraph("Your Reservation Details", header2);
            Paragraph bookingName = new Paragraph("Name : "+ name+" "+surname, p);
            Paragraph movieName = new Paragraph("Movie : "+ movie, p);
            Paragraph showtimeTime = new Paragraph("Time : "+ showtime, p);
            Paragraph seatPdf = new Paragraph("Seat No. : "+ seat, p);
            Chunk warning = new Chunk("Please, note that your reservation is valid until 30 minutes before the start of the movie",warn);
            //warning.setBackground(new BaseColor(204, 204, 204));
            img.scaleAbsoluteHeight(100F);
            img.scaleAbsoluteWidth(200F);
            document.add(img);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(chunk);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(paragraph);
            document.add(Chunk.NEWLINE);
            document.add(bookingName);
            document.add(movieName);
            document.add(showtimeTime);
            document.add(seatPdf);
            document.add(warning);

            document.close();
        } catch (FileNotFoundException | DocumentException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException  e) {
            e.printStackTrace();
        }
    }

}




