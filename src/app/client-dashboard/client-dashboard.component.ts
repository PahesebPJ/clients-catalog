import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  searchText: string = '';

  clients: any = [];

  //Input information
  inputs = [
    {
      type: 'text',
      placeholder: 'Nombre',
      name: 'nombre'
    },
    {
      type: 'text',
      placeholder: 'Apellido Paterno',
      name: 'apellido_paterno'
    },
    {
      type: 'text',
      placeholder: 'Apellido Materno',
      name: 'apellido_materno'
    },
    {
      type: 'text',
      placeholder: 'RFC',
      name: 'rfc'
    },
    {
      type: 'text',
      placeholder: 'Telefono',
      name: 'telefono'
    },
    {
      type: 'text',
      placeholder: 'Email',
      name: 'email'
    },
    {
      type: 'text',
      placeholder: 'Codigo Postal',
      name: 'codigo_postal'
    },
    {
      type: 'text',
      placeholder: 'Dirección',
      name: 'direccion'
    }
  ];

  createClientForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido_paterno: new FormControl('', [Validators.required]),
    apellido_materno: new FormControl('', [Validators.required]),
    rfc: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(13), Validators.pattern('[A-Z0-9]{13}')]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    codigo_postal: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]{5}')]),
    direccion: new FormControl('')
  });

  //Input validation
  get nombre() {
    return this.createClientForm.get('nombre');
  }

  get apellido_paterno() {
    return this.createClientForm.get('apellido_paterno');
  }

  get apellido_materno() {
    return this.createClientForm.get('apellido_materno');
  }

  get rfc() {
    return this.createClientForm.get('rfc');
  }

  get telefono() {
    return this.createClientForm.get('telefono');
  }

  get email() {
    return this.createClientForm.get('email');
  }

  get codigo_postal() {
    return this.createClientForm.get('codigo_postal');
  }

  get direccion() {
    return this.createClientForm.get('direccion');
  }

  constructor(private clientService: ClientsService) {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    })
  }

  refreshPage() {
    window.location.reload();
  }

  clientRegister() {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.createClientForm.value.email == this.clients[i].email) {
        alert('El correo ya esta registrado');
        return;
      }
    }

    this.clientService.saveClient(this.createClientForm.value).subscribe(result => {
      console.log(result);
      this.refreshPage();
    });
  }

  clientDelete(id: number) {
    this.clientService.deleteClient(id).subscribe(result => {
      console.log(result);
      this.refreshPage();
    });
  }

  clientUpdate(id: number) {
    this.clientService.updateClient(this.createClientForm.value, id).subscribe(result => {
      console.log(result);
      this.refreshPage();
    });
  }

  setClientValues(client: any) {
    console.log(client);
    this.createClientForm.setValue({
      nombre: client.nombre,
      apellido_paterno: client.apellido_paterno,
      apellido_materno: client.apellido_materno,
      rfc: client.rfc,
      telefono: client.telefono,
      email: client.email,
      codigo_postal: client.codigo_postal,
      direccion: client.direccion
    });
  }

  ngOnInit(): void {

  }

}
