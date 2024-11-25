import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/modelo/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] | null = null;

  cliente:Cliente = {
    nombre:'',
    apellido:'',
    email:'',
    saldo:undefined
  }

  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(private clienteService:ClienteService){}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    })
  }

  getSaldoTotal():number{
    return this.clientes?.reduce((total, cliente) => total + (cliente.saldo ?? 0), 0) ?? 0;
  }

  agregar(clienteForm:NgForm){
    const { value, valid } = clienteForm;
    if(valid){
      this.clienteService.agregarClient(value);
      clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
