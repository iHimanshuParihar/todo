import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToasterService } from "angular2-toaster";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent implements OnInit {
  //---------------------------------------------------Declarations------------------------------------------------------------------//

  modalReference!: NgbModalRef;
  abc: any = "";
  TodoString: any = "";
  todoData: any = {
    name: "",
    description: "",
  };
  todoList: any = [];
  item: any = "";
  isEditButton: boolean = false;
  whichButton: string = "Add";
  deleteId: any;
  imageUrls: string[] = [
    "../../../assets/1.jpg",
    "../../../assets/2.jpg",
    "../../../assets/3.jpg",
    "../../../assets/4.jpg",
    "../../../assets/5.jpg",
    "../../../assets/6.jpg",
    "../../../assets/7.jpg",
    "../../../assets/8.jpg",
    "../../../assets/9.jpg",
    "../../../assets/10.jpg",
    "../../../assets/11.jpg",
    "../../../assets/12.jpg",
    "../../../assets/13.jpg",
    "../../../assets/14.jpg",
    "../../../assets/15.jpg",
    "../../../assets/16.jpg",
    "../../../assets/17.jpg",
    "../../../assets/18.jpg",
    "../../../assets/19.jpg",
    "../../../assets/20.jpg",
    "../../../assets/21.jpg",
    "../../../assets/22.jpg",
    "../../../assets/23.jpg",
    "../../../assets/24.jpg",
    "../../../assets/25.jpg",
    "../../../assets/26.jpg",
    "../../../assets/27.jpg",
    "../../../assets/28.jpg",
  ];

  private toasterService: ToasterService;
  constructor(private modalService: NgbModal, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getTodo();
  }

  ngOnChanges() {
    this.isEditButton = false;
  }

  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      windowClass: "custom-modal",
    });
  }

  addTodo(content: any) {
    if (this.todoData.name == "") {
      this.toasterService.pop("error", "ToDo name cant be empty");
      return;
    }

    if (this.todoData.description == "") {
      this.toasterService.pop("error", "ToDo description cant be empty");
      return;
    }

    if (this.whichButton == "Update") {
      const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
      this.todoData.image = this.imageUrls[randomIndex];
      sessionStorage.setItem(this.abc, JSON.stringify(this.todoData));
      this.todoList.splice(this.abc, 1);
      this.TodoString = "";
      this.whichButton = "Add Todo";
      this.toasterService.pop("success", "Todo Updated SuccessFully");
      this.modalReference.close(content);
      this.reset();
      this.getTodo();
    } else {
      console.log(this.todoList.length);
      this.isEditButton = false;
      let key = this.todoList.length + 1;
      const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
      this.todoData.image = this.imageUrls[randomIndex];
      sessionStorage.setItem(key, JSON.stringify(this.todoData));
      this.todoList.splice(this.abc, 1);
      this.TodoString = "";
      this.modalReference.close(content);
      this.toasterService.pop("success", "Todo Added SuccessFully");
      this.reset();
      this.getTodo();
    }
  }

  getTodo() {
    this.todoList = [];
    var list;
    var keys = Object.keys(sessionStorage);
    var length = sessionStorage.length;
    for (let i = 0; i < length; i++) {
      const data = sessionStorage.getItem(keys[i]);
      if (data) list = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
      list.image = this.imageUrls[randomIndex];
      this.todoList.push({ key: Number(keys[i]), value: list });
      this.todoList.sort((first: any, second: any) =>
        first.key > second.key ? 1 : -1
      );
    }
    this.todoList = [...new Set(this.todoList)];
    return this.todoList;
  }

  deleteTodo() {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].key === this.deleteId) {
        this.todoList.splice(i, 1);
        if (sessionStorage.hasOwnProperty(this.deleteId)) {
          sessionStorage.removeItem(this.deleteId);
        }
        this.toasterService.pop("success", "Todo Deleted SuccessFully");
        break;
      }
    }
  }

  clearTodo() {
    sessionStorage.clear();
    this.todoList = [];
  }

  editTodo(id: any, content: any) {
    this.modalReference = this.modalService.open(content, {
      windowClass: "custom-modal",
    });
    this.isEditButton = true;
    this.whichButton = "Update";
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].key == id) {
        this.abc = this.todoList[i].key;
        this.todoData = this.todoList[i].value;
        break;
      }
    }
  }

  inProgress(id: any) {
    this.todoList.forEach((v: any) => {
      if (v.key === id) {
        if (v.value.inProgress) {
          v.value.inProgress = false;
          sessionStorage.setItem(id, JSON.stringify(v.value));
        } else {
          v.value.inProgress = true;
          sessionStorage.setItem(id, JSON.stringify(v.value));
        }
        this.getTodo();
      }
    });
  }

  isChecked(id: any) {
    this.todoList.forEach((v: any) => {
      if (v.key === id) {
        v.value.isChecked = true;
        v.value.inProgress = false;
        sessionStorage.setItem(id, JSON.stringify(v.value));
        this.getTodo();
      }
    });
  }
  openDoneConfirmModal() {}

  openDeleteConfirmModal(id: any, content: any) {
    console.log(id, this.todoList);
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
    this.toasterService.pop("warning", "Once Deleted it can't be Restored");
  }
  reset() {
    this.isEditButton = false;
    this.whichButton = "Add";
    this.todoData = {
      name: "",
      description: "",
    };
    this.deleteId = "";
  }
}
