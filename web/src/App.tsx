import { CreateTodo } from "./components/create-todo";
import { Dialog } from "./components/ui/dialog";
import { HeaderComponent } from "./components/header";
import { TodoListComponent } from "./components/todo";
import { FooterComponent } from "./components/footer";
import diogo from "./assets/diogo.jpg";
import {
  AlertDialog,
  AlertDialogAction, AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle, AlertDialogFooter,
  AlertDialogHeader
} from "./components/ui/alert-dialog";

function App() {
  return (
    <div>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Diogo Julio</AlertDialogTitle>
            <AlertDialogDescription className="flex justify-between">
              <span className="mr-4">
                Atualmente trabalho como suporte Help Desk, porém meu sonho
                sempre foi ser desenvolvedor, e continuo correndo atrás desse
                sonho incansávelmente. Sejá na faculdade ou em casa, estou
                sempre estudando e buscando minha evolução.
                <ul className="list-disc mt-2">
                  <li>Tempo estimado do projeto: <b>8h</b></li>
                  <li>
                    Tecnologias: <b>ReactJS</b> (Vite), <strong>NestJS</strong> (Node), <b>PostgreSQL</b>
                  </li>
                </ul>
              </span>
              <img width={200} height={200} src={diogo} alt="" />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog>
        <HeaderComponent />
        <TodoListComponent />
        <CreateTodo />
        <FooterComponent />
      </Dialog>
    </div>
  );
}

export default App;
