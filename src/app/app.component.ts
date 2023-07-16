import { Component } from "@angular/core";
import { ToasterConfig } from "angular2-toaster";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "todo";
  public config: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    timeout: 1000,
    positionClass: "toast-top-center",
  });
}
