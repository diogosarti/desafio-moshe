import { CreateTodo } from "./components/create-todo";
import { Dialog } from "./components/ui/dialog";
import { HeaderComponent } from "./components/header";
import { TodoListComponent } from "./components/todo";
import { FooterComponent } from "./components/footer";
import diogo from "./assets/diogo.jpg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./components/ui/alert-dialog";

function App() {
  return (
    <div>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Diogo Julio</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col justify-between sm:flex-row items-center gap-4">
              <span className="mr-4">
                Atualmente trabalho como suporte Help Desk, porém meu sonho
                sempre foi ser desenvolvedor, e continuo correndo atrás desse
                sonho incansávelmente. Sejá na faculdade ou em casa, estou
                sempre estudando e buscando minha evolução.
              </span>

              <img width={200} height={200} className="" src={diogo} alt="" />
            </AlertDialogDescription>
            <ul className="list-disc mt-2">
              <li>
                Tempo estimado do projeto: <strong>8h</strong>
              </li>
              <li>
                Tecnologias: <strong>ReactJS</strong> (Vite),{" "}
                <strong>NestJS</strong> (Node), <strong>PostgreSQL</strong>
              </li>
            </ul>
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
