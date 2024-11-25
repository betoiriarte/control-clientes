import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre:'',
    apellido:'',
    email:'',
    saldo:undefined
  }

  id:string | null = null;

  constructor(private clienteService:ClienteService, 
    private router:Router, 
    private route:ActivatedRoute)
  {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.clienteService.getCliente(this.id).subscribe((cliente:Cliente | null) => {
        if(cliente){
          this.cliente = cliente;
        }else{
          console.log(`Cliente no necontrado: ${this.id}`);
          this.router.navigate(['']);
        }
      });
    }else{
      console.log('Id no proporcionado');
      this.router.navigate(['']);
    }
  }

  guardar(clienteForm:NgForm){
    const { value, valid } = clienteForm;
    if(valid){
      value.id = this.id;
      this.clienteService.modificarCliente(value);
      this.router.navigate(['']);
    }
  }

  eliminar(){
    if(confirm('¿Seguro que desea eliminar el cliente?')){
      this.clienteService.eliminarCliente(this.cliente);
      this.router.navigate(['']);
    }
  }

}
