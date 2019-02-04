import * as _ from 'lodash';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { AstMemoryEfficientTransformer } from '@angular/compiler';

export interface Transformer {
  Name: string;
  Group: string;
  Strength: number;
  Intelligence: number;
  Speed: number;
  Endurance: number;
  Rank: number;
  Courage: number;
  Firepower: number;
  Skill: number;  
}

@Component({
  selector: 'app-transformation-dashboard',
  templateUrl: './transformation-dashboard.component.html',
  styleUrls: ['./transformation-dashboard.component.css']
})
export class TransformationDashboardComponent {
  groups: Array<object> = [
    { value: 'A', viewValue: 'Autobots' },
    { value: 'D', viewValue: 'Deceptions' }
  ];

  ranks: Array<object> = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
    { value: 7, viewValue: '7' },
    { value: 8, viewValue: '8' },
    { value: 9, viewValue: '9' },
    { value: 10, viewValue: '10' }
  ];

  transformer: Transformer = {
    Name: '',
    Group: 'A',
    Strength: 1,
    Intelligence: 1,
    Speed: 1,
    Endurance: 1,
    Rank: 1,
    Courage: 1,
    Firepower: 1,
    Skill: 1,
  };

  transName: string = '';
  transGroup: string = 'A';

  transDescription: string = '';

  transformers: Array<object> = [];

  result: Array<string> = [];

  constructor() { }

  addTransformer() {
    if (this.transformer.Name === '') {
      alert("The name field is required!")
      return;
    } else if (_.find(this.transformers, {transformer: {Name: this.transformer.Name}})) {
      alert('This transformer has been in the group.');
      return;
    }

    let item = _.cloneDeep(this.transformer);
    this.transformers.push({transformer: item, selected: false});
  }

  addTransByNameAndGroup() {
    if (this.transName === '') {
      alert("The name field is required!")
      return;
    } else if (_.find(this.transformers, {transformer: {Name: this.transName}})) {
      alert('This transformer has been in the group.');
      return;
    }

    let newTrans = {
      Name: this.transName,
      Group: this.transGroup,
      Strength: Math.floor(Math.random()*10) + 1,
      Intelligence: Math.floor(Math.random()*10) + 1,
      Speed: Math.floor(Math.random()*10) + 1,
      Endurance: Math.floor(Math.random()*10) + 1,
      Rank: Math.floor(Math.random()*10) + 1,
      Courage: Math.floor(Math.random()*10) + 1,
      Firepower: Math.floor(Math.random()*10) + 1,
      Skill: Math.floor(Math.random()*10) + 1,
    };

    this.transformers.push({transformer: newTrans, selected: false});
  }

  addTransByDescription() {
    let transArray = this.transDescription.split(',');
    if (transArray.length < 10) {
      alert("The input fields is not enough!")
      return;
    } else if (transArray[0] === '') {
      alert("The name field is required!")
      return;
    } else if (transArray[1] !== "A" && transArray[1] !== "D") {
      alert("The group field is incorrect!")
      return;
    } else if (_.find(this.transformers, {transformer: {Name: transArray[0]}})) {
      alert('This transformer has been in the group.');
      return;
    } else if (!_.isNumber(transArray[2]) && (parseInt(transArray[2]) < 1 || parseInt(transArray[2])) > 10) {
      alert("The Strength field is invalid!")
      return;
    } else if (!_.isNumber(transArray[3]) && (parseInt(transArray[3]) < 1 || parseInt(transArray[3])) > 10) {
      alert("The Intelligence field is invalid!")
      return;
    } else if (!_.isNumber(transArray[4]) && (parseInt(transArray[4]) < 1 || parseInt(transArray[4]) > 10)) {
      alert("The Speed field is invalid!")
      return;
    } else if (!_.isNumber(transArray[5]) && (parseInt(transArray[5]) < 1 || parseInt(transArray[5])) > 10) {
      alert("The Endurance field is invalid!")
      return;
    } else if (!_.isNumber(transArray[6]) && (parseInt(transArray[6]) < 1 || parseInt(transArray[6])) > 10) {
      alert("The Rank field is invalid!")
      return;
    } else if (!_.isNumber(transArray[7]) && (parseInt(transArray[7]) < 1 || parseInt(transArray[7])) > 10) {
      alert("The Courage field is invalid!")
      return;
    } else if (!_.isNumber(transArray[8]) && (parseInt(transArray[8]) < 1 || parseInt(transArray[8]) > 10)) {
      alert("The Firepower field is invalid!")
      return;
    } else if (!_.isNumber(transArray[9]) && (parseInt(transArray[9]) < 1 || parseInt(transArray[9])) > 10) {
      alert("The Skill field is invalid!")
      return;
    }

    let newTrans = {
      Name: transArray[0],
      Group: transArray[1],
      Strength: parseInt(transArray[2]),
      Intelligence: parseInt(transArray[3]),
      Speed: parseInt(transArray[4]),
      Endurance: parseInt(transArray[5]),
      Rank: parseInt(transArray[6]),
      Courage: parseInt(transArray[7]),
      Firepower: parseInt(transArray[8]),
      Skill: parseInt(transArray[9]),
    };

    this.transformers.push({transformer: newTrans, selected: false});
  }

  transformerToString(item: Transformer){
    let transformerString = item.Name + ',' 
    + item.Group + ',' 
    + item.Strength + ','
    + item.Intelligence + ','
    + item.Speed + ','
    + item.Endurance + ','
    + item.Rank + ','
    + item.Courage + ','
    + item.Firepower + ','
    + item.Skill;
    return transformerString;
  }

  removeTransformer() {
    this.transformers = this.transformers.filter(function(value: {selected}){
      return value.selected === false;
    });
  }

  fight() {
    this.result = [];

    let teamA = _.orderBy(this.transformers.filter(function(value: {transformer}){
      return value.transformer.Group === "A";
    }), ['Rank'], ['desc']);

    let teamD = _.orderBy(this.transformers.filter(function(value: {transformer}){
      return value.transformer.Group === "D";
    }), ['Rank'], ['desc']);

    if (teamA.length > 0 && teamD.length === 0) {
      this.result.push("0 battle");
      this.result.push("No team (Decepticons)");
    } else if (teamA.length === 0 && teamD.length > 0) {
      this.result.push("0 battle");
      this.result.push("No team (Autobots)");
    } else {
      if (teamA.length < teamD.length) {
        let teamAWin = [];
        let teamDWin = [];
        for (var i = 0; i < teamA.length; i++) {
          let winner = this.transformerFighting(teamA[i].transformer, teamD[i].transformer);
          if (winner !== '') {
            if (winner.split(",")[1] === "A") {
              teamAWin.push(winner);
            } else {
              teamDWin.push(winner);
            }
          }
        }
        this.result.push(teamA.length + " battles");
        this.result.push('Winning team (' + (teamAWin.length > teamDWin.length ? "Autobots" : "Decepticons") + ")");
      } else {
        let teamAWin = [];
        let teamDWin = [];
        for (var i = 0; i < teamD.length; i++) {
          let winner = this.transformerFighting(teamA[i].transformer, teamD[i].transformer);
          if (winner !== '') {
            if (winner.split(",")[1] === "A") {
              teamAWin.push(winner);
            } else {
              teamDWin.push(winner);
            }
          }
        }
        this.result.push(teamD.length + " battles");
        this.result.push('Winning team (' + (teamAWin.length > teamDWin.length ? "Autobots" : "Decepticons") + ")");
      }
    }
  }

  transformerFighting(a: Transformer, b: Transformer) {
    if (a.Group === b.Group) {
      return '';
    }

    let specialNames = ['Optimus Prime', 'Predaking'];
    if (_.includes(specialNames, a.Name) && _.includes(specialNames, b.Name)) {
      return '';
    } else if (_.includes(specialNames, a.Name) && !_.includes(specialNames, b.Name)) {
      return this.transformerToString(a);
    }  else if (!_.includes(specialNames, a.Name) && _.includes(specialNames, b.Name)) {
      return this.transformerToString(b);
    }

    if (a.Courage - b.Courage >= 4) {
      return this.transformerToString(a);
    } else if (b.Courage - a.Courage >= 4) {
      return this.transformerToString(b);
    }

    if (a.Strength - b.Strength >= 3) {
      return this.transformerToString(a);
    } else if (b.Strength - a.Strength >= 3) {
      return this.transformerToString(b);
    }

    if (a.Skill - b.Skill >= 3) {
      return this.transformerToString(a);
    } else if (b.Skill - a.Skill >= 3) {
      return this.transformerToString(b);
    }

    if ((a.Strength + a.Intelligence + a.Speed + a.Endurance + a.Firepower) > (b.Strength + b.Intelligence + b.Speed + b.Endurance + b.Firepower)) {
      return this.transformerToString(a);
    } else if ((a.Strength + a.Intelligence + a.Speed + a.Endurance + a.Firepower) < (b.Strength + b.Intelligence + b.Speed + b.Endurance + b.Firepower)) {
      return this.transformerToString(b);
    } else {
      return '';
    }
  }
}
