import { Injectable } from '@angular/core';
import { collectionData, Firestore, collection, orderBy, query, addDoc, CollectionReference, doc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private clientesRef: CollectionReference<Cliente>;
  clientes:Observable<Cliente[]>;
 
  constructor(private firestore:Firestore) {
    this.clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(this.clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionData(consulta, { idField: 'id' }) as Observable<Cliente[]>;
  }

  getClientes():Observable<Cliente[]>{
    return this.clientes;
  }

  agregarClient(cliente:Cliente){
    return addDoc(this.clientesRef, cliente);
  }

  getCliente(id:string):Observable<Cliente | null>{
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    return docData(clienteDocRef, {idField:'id'}) as Observable<Cliente>;
  }

  modificarCliente(cliente:Cliente){
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return updateDoc(clienteDoc, {...cliente});
  }

  eliminarCliente(cliente:Cliente){
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return deleteDoc(clienteDoc);
  }

}
