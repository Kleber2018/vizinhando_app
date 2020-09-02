import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-servico-dialog',
  templateUrl: './servico-dialog.component.html',
  styleUrls: ['./servico-dialog.component.css']
})
export class ServicoDialogComponent {


  // public servicos: [
  //   'AJUSTAR', 
  //   'ALTERAR',
  //   'DEENVOLVIMENTO TÉCNICO',
  //   'FABRICAR',
  //   'FISCALIZAR',
  //   'INSPECIONAR',
  //   'INSTALAR',
  //   'LIMPAR',
  //   'LUBRIFICAR',
  //   'MANOBRAR',
  //   'MEDIR',
  //   'REFORMAR',
  //   'RETIRAR',
  //   'REVESTIR',
  //   'REVISAR',
  //   'SERVIÇOS ADM',
  //   'SOLDAR',
  //   'SUBSTITUIR',
  //   'TESTAR',
  //   'TRANSPORTAR',
  //   'TREINAR',
  //   'TROCAR EQUIPAMENTO',
  //   'USINAR'
  // ]

  public servicos = [
    { cod: 'A', titulo: 'AJUSTAR'},
    { cod: 'B', titulo: 'ALTERAR'},
    { cod: 'P', titulo: 'DESENVOLVIMENTO TÉCNICO'},
    { cod: 'X', titulo: 'FABRICAR'},
    // { cod: 'F', titulo: 'FISCALIZAR'},
    { cod: 'C', titulo: 'INSPECIONAR'},
    { cod: 'I', titulo: 'INSTALAR'},
    { cod: 'H', titulo: 'LIMPAR'},
    // { cod: 'L', titulo: 'LUBRIFICAR'},
    // { cod: 'W', titulo: 'MANOBRAR'},
    // { cod: 'M', titulo: 'MEDIR'},
    { cod: 'Y', titulo: 'REFORMAR'},
    { cod: 'Z', titulo: 'TROCAR EQUIPAMENTO'},
    { cod: 'U', titulo: 'USINAR'},
    { cod: 'S', titulo: 'SUBSTITUIR'},
  ];

  public efeitos = [
    { cod: 'CFB', titulo: 'CONFIABILIDADE'},
    { cod: 'DEP', titulo: 'DESPERDÍCIO/PERDAS'},
    { cod: 'FDA', titulo: 'FALTA D AGUA'},
    { cod: 'IAB', titulo: 'IMPACTO AMBIENTAL'},
    { cod: 'INV', titulo: 'INOVAÇÃO'},
    { cod: 'IPD', titulo: 'INCREMENTO DE PRODUÇÃO'},
    { cod: 'IOP', titulo: 'INDISP. OPERACIONAL'},
    { cod: 'NCF', titulo: 'NÃO CONFORMIDADE'},
    // { cod: 'ORG', titulo: 'ORGANIZAÇÃO GESTÃO'},
    { cod: 'SGR', titulo: 'SEGURANÇA'}
  ]

  public causas = [
    { 
      cod: 'AD',
      titulo: 'ADEQUAÇÃO',
      relacionadas: [{
        cod: 'ADT',
        titulo: 'Técnica/Operacional'
      }]
    },
    { 
      cod: 'FE',
      titulo: 'FATORES ELÉTRICOS',
      relacionadas: [{
        cod: 'FEA',
        titulo: 'ATERRAMENTO'
      },
      {
        cod: 'FEB',
        titulo: 'SENSIBILIDADE'
      },
      {
        cod: 'FEC',
        titulo: 'CURTO-CIRCUITO'
      },
      {
        cod: 'FEI',
        titulo: 'BAIXA ISOLAÇÃO'
      },
      {
        cod: 'FES',
        titulo: 'SOBRECORRENTE'
      }]
    },
    { 
      cod: 'FM',
      titulo: 'FATORES MECÂNICOS',
      relacionadas: [{
        cod: 'FMD',
        titulo: 'DESGASTE'
      },
      {
        cod: 'FMC',
        titulo: 'COMPONENTES'
      },
      {
        cod: 'FMB',
        titulo: 'DESALINHAMENTO'
      },
      {
        cod: 'FMA',
        titulo: 'ATRITO'
      },
      {
        cod: 'FML',
        titulo: 'LUBRIFICAÇÃO'
      },
      {
        cod: 'FMR',
        titulo: 'RUÍDO'
      },
      {
        cod: 'FMZ',
        titulo: 'VAZAMENTO'
      },
      {
        cod: 'FMV',
        titulo: 'VIBRAÇÃO'
      },
      {
        cod: 'FMM',
        titulo: 'MONTAGEM INDEVIDA'
      }]
    },
    { 
      cod: 'FO',
      titulo: 'FATORES OPERACIONAIS',
      relacionadas: [{
        cod: 'FOO',
        titulo: 'Operação indevida'
      },
      {
        cod: 'FOL',
        titulo: 'Conservação/Limpeza'
      }]
    },
    { 
      cod: 'FX',
      titulo: 'FATORES EXTERNOS',
      relacionadas: [{
        cod: 'FXC',
        titulo: 'Corrosão'
      },
      {
        cod: 'FXD',
        titulo: 'Descarga Atmosférica (Surto)'
      },
      {
        cod: 'FXI',
        titulo: 'Inundação e Umidade'
      }]
    },
    { 
      cod: 'FX',
      titulo: 'FATORES EXTERNOS',
      relacionadas: [{
        cod: 'FXC',
        titulo: 'Corrosão'
      },
      {
        cod: 'FXD',
        titulo: 'Descarga Atmosférica (Surto)'
      },
      {
        cod: 'FXI',
        titulo: 'Inundação e Umidade'
      }]
    },
    { 
      cod: 'FV',
      titulo: 'FURTO e VANDALISMO',
      relacionadas: [{
        cod: 'FVC',
        titulo: 'Furto Componentes Elétricos'
      },
      {
        cod: 'FVE',
        titulo: 'Furto Equipamentos'
      },
      {
        cod: 'FVV',
        titulo: 'Vandalismo/Destruição'
      }]
    },
    { 
      cod: 'PV',
      titulo: 'PREVENÇÃO',
      relacionadas: [{
        cod: 'PVD',
        titulo: 'Diagnóstico'
      },
      {
        cod: 'PVI',
        titulo: 'Inspeção Eletromecânica'
      },
      {
        cod: 'PVM',
        titulo: 'Medições Eletromecânicas'
      }]
    }
  ]

  public opcoes: any;
  public tipo: string; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ServicoDialogComponent>,) {
                this.tipo = data;
                if(data == 'SERVICO'){
                  this.opcoes = this.servicos;
                } else if(data == 'EFEITO'){
                  this.opcoes = this.efeitos;
                } else if(data == 'CAUSA'){
                  this.opcoes = this.causas;
                }
              }


  escolhendo(servico: {cod: string, titulo: string}) {
     this.dialogRef.close(servico);
  }

}
