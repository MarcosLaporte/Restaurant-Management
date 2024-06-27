import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonButton, IonIcon, IonAvatar, IonList } from '@ionic/angular/standalone';
import { Colecciones, DatabaseService } from 'src/app/services/database.service';
import { Cliente } from 'src/app/utils/classes/usuarios/cliente';
import { addIcons } from 'ionicons';
import { addCircleOutline, checkmarkCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-pendientes',
  templateUrl: './lista-pendientes.page.html',
  styleUrls: ['./lista-pendientes.page.scss'],
  standalone: true,
  imports: [IonList, IonAvatar, IonIcon, IonButton, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListaPendientesPage implements OnInit {

  // protected clientes: Cliente[] = [];
  protected clientes: Cliente[] =
  [
    {
        "apellido": "Carlos",
        "fotoUrl": "https://firebasestorage.googleapis.com/v0/b/pps-sp-comanda.appspot.com/o/users%2Fcliente-23628819?alt=media&token=1fcafef1-fc52-4d20-8d56-59672837d5d1",
        "dni": 23628819,
        "estadoCliente": "pendiente",
        "correo": "robertoCarlos@gmail.com",
        "rol": "cliente",
        "nombre": "Roberto",
        "idMesa": null,
        "tipo": "registrado",
        "id": "OKKwvWKGkDC9CsjCcIUK"
    },
    {
        "fotoUrl": "https://firebasestorage.googleapis.com/v0/b/pps-sp-comanda.appspot.com/o/users%2Fcliente-32453888?alt=media&token=b8454705-af17-41ca-aacd-9510b9060a34",
        "nombre": "Pepito",
        "estadoCliente": "pendiente",
        "id": "VuIUEXELrX4AZsLs6F8X",
        "rol": "cliente",
        "apellido": "Lopez",
        "idMesa": null,
        "correo": "elpepe@outlook.com",
        "tipo": "registrado",
        "dni": 32453888
    }
  ];

  constructor(protected db : DatabaseService, 
    private spinner: NgxSpinnerService) {
    addIcons({ checkmarkCircleOutline, removeCircleOutline });
  }

  ngOnInit() {
    // this.spinner.show();
    // this.spinner.hide();  
    // this.db.escucharColeccion<Cliente>(Colecciones.Usuarios, this.clientes, ( c => {
    //   if (c.estadoCliente == 'pendiente')
    //     return true;
    //   else
    //     return false
    // }))

    console.log(this.clientes);
  }
  aceptarCliente(id: string){
    this.db.actualizarDoc(Colecciones.Usuarios, id, {'estadoCliente':'aceptado'}).then(() => {
      
    })
  }
  
  rechazarCliente(id: string){
    this.db.actualizarDoc(Colecciones.Usuarios, id, {'estadoCliente':'rechazado'})
    
  }

  
  enviarMail(){
    const express = require('express');
    const bodyParser = require('body-parser');
    const nodemailer = require('nodemailer');
    
    const app = express();
    app.use(bodyParser.json());
    
    app.post('/send-mail', async (req:any, res:any) => {
        try {
            const { aceptacion = true, nombreUsuario = 'jaco', mail = 'jacoluna01@gmail.com' } = req.body;
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'losyourdonistas@gmail.com',
                    pass: 'losYourdonistas1.',
                },
            });
    
            let resultado = await transporter.sendMail({
                from: '"Mi Comanda" <losyourdonistas@gmail.com>',
                to: mail,
                subject: aceptacion ? 'Felicitaciones su cuenta fue aceptada' : 'Disculpe pero hemos bloqueado su cuenta',
                html: `
            <h1>${aceptacion ? 'Felicitaciones ' : 'Disculpe '} ${nombreUsuario}</h1>
            <p>Su cuenta fue ${aceptacion ? 'aceptada' : 'rechazada'}</p>
            <p>Saludos La Comanda</p>
            `,
            });
            res.json({ ...resultado, seEnvio: true });
        } catch (e) {
            res.json({
                mensaje: 'No se pudo enviar el mail',
                seEnvio: false,
            });
        }
    });
    
    app.listen(process.env['PORT'] || 3000, () => console.log('App lista'));
  }
}
