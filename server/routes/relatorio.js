var pdfDocument = require('pdfkit');
var pixelWidth = require('string-pixel-width');
var express = require('express');
var blobstream = require('blob-stream');
var fs = require('fs');
var router = express.Router();


router.post('/relatorio', function(req, res){
    var pdf = new pdfDocument();
    var width = pixelWidth(req.body.logradouro.toUpperCase() + ' ' + req.body.numero, { size: 10 });
    var filename = req.body.nome + ' ' + req.body.sobrenome;
    filename = new Buffer(filename.replace(/\s/g, '')) + '.pdf';
    
    //Header configuration to download pdf file
    res.setHeader('Content-disposition', 'attachment; filename= ' + filename);
    res.setHeader('Content-type', 'application/pdf');

    //PDF Header
    pdf.image('image/TechULogo.png', 260, 15, {fit: [100, 100]});
    pdf.fontSize(15).fillColor('#000000');
    pdf.text('Requerimento de Matrícula Tech U', 190, 100);

    printDescriptions(pdf);
    printPersonalInfo(pdf, req, width);
    printFields(pdf);

    //Deals with signature
    pdf.image(new Buffer(req.body.assinatura.replace('data:image/png;base64,',''), 'base64'), 230 , 390, {fit: [150,150]});


    //End the pdf sending it as a response
    pdf.pipe(res);
    pdf.end();
});

function printFields(pdf){
     //Line width definition for the fields
    pdf.lineWidth(0.5);

    //Name/Birth field
    pdf.rect(30, 150, 550, 30);
    pdf.lineCap('butt').moveTo(430, 150).lineTo(430, 180);

    //E-mail/Phone field
    pdf.rect(30, 183, 550, 30);
    pdf.lineCap('butt').moveTo(430, 183).lineTo(430, 213);

    //CPF/ID/Gender field
    pdf.rect(30, 216, 550, 30);
    pdf.lineCap('butt').moveTo(230, 216).lineTo(230, 246);
    pdf.lineCap('butt').moveTo(430, 216).lineTo(430, 246);

    //Address Field
    pdf.rect(30, 249, 550, 30);
    pdf.lineCap('butt').moveTo(230, 249).lineTo(230, 279);
    pdf.lineCap('butt').moveTo(430, 249).lineTo(430, 279);

    //City/Country/State/Zip Code field
    pdf.rect(30, 282, 550, 30);
    pdf.lineCap('butt').moveTo(167.5, 282).lineTo(167.5, 312);
    pdf.lineCap('butt').moveTo(305, 282).lineTo(305, 312);
    pdf.lineCap('butt').moveTo(442.5, 282).lineTo(442.5, 312);

    //Course1 field
    pdf.rect(30, 315, 550, 30);
    pdf.lineCap('butt').moveTo(400, 315).lineTo(400, 345);
    
    //Course2 field
    pdf.rect(30, 348, 550, 30);
    pdf.lineCap('butt').moveTo(400, 348).lineTo(400, 378);

    //Signature field
    pdf.lineCap('butt').moveTo(180, 450).lineTo(430, 450);
   
    //Prints field strokes
    pdf.stroke();   
}

function printDescriptions(pdf){
    //Field Description
    pdf.fontSize(6).fillColor('#b2b2b2');
    pdf.text('NOME COMPLETO - FULL NAME', 33, 153);
    pdf.text('NASCIMENTO - BIRTH DATE', 433, 153);
    pdf.text('E-MAIL', 33, 186);
    pdf.text('TELEFONE - PHONE', 433, 186);
    pdf.text('CPF (BRAZILIAN DOCUMENT)', 33, 219);
    pdf.text('IDENTIDADE - TRAVEL DOCUMENT', 233, 219);
    pdf.text('SEXO - GENDER', 433, 219);
    pdf.text('RESIDÊNCIA PERMANENTE - PERMANENT ADDRSS', 33, 252);
    pdf.text('COMPLEMENTO - COMPLEMENT', 233, 252);
    pdf.text('BAIRRO - NEIGHBOURHOOD', 433, 252);
    pdf.text('CEP - ZIP CODE', 33, 285);
    pdf.text('CIDADE - CITY', 170.5, 285);
    pdf.text('ESTADO - STATE', 308, 285);
    pdf.text('PAÍS - COUNTRY', 445.5, 285);
    pdf.text('PRIMEIRA OPÇÃO - FIRST OPTION', 33, 318);
    pdf.text('UNIDADE - CAMPUS', 403, 318);
    pdf.text('SEGUNDA OPÇÃO - SECOND OPTION', 33, 351);
    pdf.text('UNIDADE - CAMPUS', 403, 351);
    pdf.text('ASSINATURA DO ALUNO - STUDENT\'S SIGNATURE',230, 453);
}

function printPersonalInfo(pdf, req, width){
    //Personal Info
    pdf.font('Helvetica-Bold').fontSize(8.5).fillColor('#000');
    pdf.text(req.body.nome.toUpperCase() + ' ' + req.body.sobrenome.toUpperCase() , 33, 165);
    pdf.text(req.body.datanasc, 433, 165);
    pdf.text(req.body.email.toUpperCase(), 33, 198);
    pdf.text(req.body.telefone, 433, 198);
    pdf.text(req.body.cpf, 33, 231);
    pdf.text(req.body.rg, 233, 231);
    pdf.text(req.body.sexo.toUpperCase(), 433, 231);
    if(width > 190){
        if(req.body.numero != undefined){
            pdf.text(req.body.logradouro.toUpperCase() + ' ' + req.body.numero, 33, 261,{width: 190});
        }else{
            pdf.text(req.body.logradouro.toUpperCase(), 33, 261,{width: 190});
        }
    }else{
        if(req.body.numero != undefined){
            pdf.text(req.body.logradouro.toUpperCase() + ' ' + req.body.numero, 33, 264); 
        }else{
            pdf.text(req.body.logradouro.toUpperCase(), 33, 264); 
        } 
    }
    if(req.body.complemento != ''){
        pdf.text(req.body.complemento.toUpperCase(), 233, 264);
    }else{
        pdf.text('-', 233, 264);
    }
    pdf.text(req.body.bairro.toUpperCase(), 433, 264);
    pdf.text(req.body.cep, 33, 297);
    pdf.text(req.body.cidade.toUpperCase(), 170.5, 297);
    pdf.text(req.body.estado.toUpperCase(), 308, 297);
    pdf.text(req.body.pais.toUpperCase(), 445.5, 297);
    pdf.text(req.body.curso1.toUpperCase(), 33, 330);
    pdf.text(req.body.unidade1.toUpperCase(),403, 330,{width: 190});
    pdf.text(req.body.curso2.toUpperCase(), 33, 363);
    pdf.text(req.body.unidade2.toUpperCase(), 403, 363,{width: 190});
}

module.exports = router;