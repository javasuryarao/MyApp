import { Component } from '@angular/core';
@Component({
    selector: 'user',
    template: `
    <link rel="stylesheet" href="/myapp.css">
    <h1 class="container">Cashless</h1>
    <div class="header">
    <button (click)="showAgent()">Agent</button>   
    <button (click)="showUser()">User</button>
     <div *ngIf="user && loggedIn">
        <button (click)="logoutUser()">Logout </button>
    </div>
    </div>
    <div *ngIf="user && !loggedIn" class="form">
        <label>Login</label>
        <input type='text' name='from' [(ngModel)]='from' />
        <button (click)="loginUser()">Login </button>
    </div>
   
     <div *ngIf="user && loggedIn">
       <h3> Welcome {{from}}, your balance is {{balance}}</h3>
       
    </div>
    
  <div  *ngIf="agent || (user && loggedIn)" class="form">
   
  
   <form>
        <div *ngIf="agent">
          <label>Transfer From</label>
            <input type='text' name='from' [(ngModel)]='from' />
        </div>
    <label>Transfer To</label>
    <input type='text' name='to' [(ngModel)]='to' />
    <label>Amount</label>
    <input type='text' #amount />
    <button (click)="transfer(amount.value)">Send Money </button>
   </form>
  </div>
   <div *ngIf="agent">
        <h3>Accounts Snpashot:</h3> 
        <ul>
        <li *ngFor="let account of accounts;let i = index">{{account.name}}  &#8377;{{account.balance}} <button (click)="deleteAccount(i)">X</button></li>
        </ul>
         <form>
           <label>Name</label>
            <input type='text' name='from' [(ngModel)]='from' />
            <label>Opening Balance</label>
            <input type='text' name='balance' [(ngModel)]='balance' />
            <button (click)="openAccount(from,balance)">Open Account </button>
        </form>
    </div>

    <h3>Recent Activity:</h3> 
        <div  *ngIf="agent">
        
        <ul>
        <li *ngFor="let activity of activityList">
        {{activity.time}}  {{activity.name}}  &#8377;{{activity.amount}}  {{activity.description}}
        </li>
        </ul>
 </div>
        <div  *ngIf="(user)">
        
        <ul>
        <li *ngFor="let activity of getuserActivitylist()">
        {{activity.time}}  {{activity.name}}  &#8377;{{activity.amount}}  {{activity.description}}
        </li>
        </ul>
 </div>
    `
})
export class UserComponent {
    agent: boolean;
    user: boolean;
    loggedIn: boolean;
    from: string;
    to: string;
    balance: number;
    accounts: [account];
    activityList: [activity];
    constructor() {
        this.accounts = [
            new account(1, 'Surya', 1000),
            new account(2, 'Sudha', 1000),
            new account(3, 'Sahasra', 1000),
            new account(4, 'Milkman', 0),
            new account(5, 'Rajavva', 0),
            new account(6, 'Kirana', 0)
        ];
        this.activityList = [new activity(this.getDate(), 'System', 0.00, 'System initialized.')];
        this.showAgent();
        this.loggedIn = false;

    }
    loginUser() {
        this.loggedIn = false;
        for (var i = 0; i < this.accounts.length; i++) {
            var account = this.accounts[i];
            var name = account.name;
            if (name == this.from) {
                this.loggedIn = true;
                this.balance = account.balance;
                this.from
            }
        }
    }
    logoutUser() {
        for (var i = 0; i < this.accounts.length; i++) {
            var account = this.accounts[i];
            var name = account.name;
            if (name == this.from) {
                this.loggedIn = false;
                this.balance = account.balance;
                this.from = '';
            }
        }
    }
    showAgent() {
        this.agent = true;
        this.user = false;
    }
    showUser() {
        this.agent = false;
        this.user = true;
    }

    deleteAccount(i: number) {
        this.accounts.splice(i, 1);
    }

    openAccount(name: string, initialDeposit: number) {
        var newAccount = new account(this.accounts.length + 1, name, initialDeposit);
        this.accounts.push(newAccount);
        var newActivity = new activity(this.getDate(), name, initialDeposit, 'Account opened.');
        this.activityList.push(newActivity);
    }
    getuserActivitylist() {
        var subllist = [activity];
        for (var i = 0; i < this.activityList.length; i++) {

        }
        return this.activityList;
    }

    getDate() {
        var date = new Date();
        var hours = date.getHours();
        var minutes: string;
        minutes = date.getMinutes() + "";
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }



    transfer(amountValue: string) {
        var toAccountFound = false;
        for (var i = 0; i < this.accounts.length; i++) {
            var account = this.accounts[i];
            var name = account.name;
            console.log('looking for ' + this.from + 'loop for ' + name);
            if (name == this.from) {
                console.log('deducting  from account ' + name);
                var amountNum = Number(amountValue);
                account.balance = account.balance - Number(amountValue);
                this.balance = account.balance;
            }
            if (name == this.to) {
                toAccountFound = true;
                console.log('crediting to account ' + name);
                account.balance = account.balance + Number(amountValue);
            }
        }
        if (!toAccountFound) {
            this.openAccount(this.to, Number(amountValue));
        }

        var newActivity = new activity(this.getDate(), this.from, Number(amountValue), ' Transfferd to' + this.to);
        this.activityList.push(newActivity);

    }
}


class account {
    constructor(
        public id: number,
        public name: string,
        public balance: number) { }
}

class activity {
    constructor(
        public time: string,
        public name: string,
        public amount: number,
        public description: string) { }

    logActivity(time: string, name: string, amount: number, description: string) {
        console.log(time + " - " + name + " - " + amount + " - " + description + " - ");

    }
}