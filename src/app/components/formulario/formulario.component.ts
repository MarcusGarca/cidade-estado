import { Cadastro } from './../../models/cadastro.model';
import { IbgeService } from './../../services/ibge.service';
import { CidadeEstado } from './../../models/cidade-estado.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @ViewChild(MatSelect) estadoSelecionado!: MatSelect;
  formulario!: FormGroup;
  cadastro!: Cadastro;
  estados!: any;
  uf!: string;
  cidades!: CidadeEstado[];

  disabled: boolean = false;
  snackBar = inject(MatSnackBar);
  constructor(
    private formBuilder: FormBuilder,
    private ibgeService: IbgeService,
  ) {
    this.cadastro = {} as Cadastro
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      estado: new FormControl(this.cadastro.estado, [Validators.required]),
      cidade: new FormControl(this.cadastro.cidade, [Validators.required])
    })
    this.listaEstados();
  }

  get estado() {
    return this.formulario.get('estado')!;
  }
  get cidade() {
    return this.formulario.get('cidade')!;
  }

  public listaEstados(): void {
    this.ibgeService.listaDeEstadosIbge().subscribe(
      (data: any) => {
        this.estados = data
      },
      (error) => { console.log(error) }
    )
  }

  public listaCidades(): void {
    this.uf = this.estadoSelecionado.value;
    this.ibgeService.listaDeCidadesIbge(this.uf).subscribe(
      (data: any) => {
        this.cidades = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mensagemSucessoEnvioFormulario() {
    this.snackBar.open(this.estado.value + ' - ' + this.cidade.value, 'OK', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: 'snackbar-sucesso',
    });
    this.formulario.reset({ cidade: '', estado: '' });
  }


}
