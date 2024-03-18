import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

type appProps = {
  onIsLoggedIn: (value: boolean) => void;
  isbutton: boolean;
};

export function Login({ onIsLoggedIn, isbutton = true }: appProps) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errormsg, setErrormsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
    if (!values.email || !values.password) {
      setErrormsg("Fill all fields");
      return;
    }
    setErrormsg("");
    console.log(values);
    setSubmitButtonDisabled(false);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        setSubmitButtonDisabled(false);
        onIsLoggedIn(true);
        console.log(res);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrormsg(err.message);

        console.log(err.message);
      });
  };

  const handleGuest = () => {
    setErrormsg("");
    setSubmitButtonDisabled(false);
    signInWithEmailAndPassword(auth, "guest@gmail.com", "123456")
      .then((res) => {
        setSubmitButtonDisabled(false);
        onIsLoggedIn(true);
        console.log(res);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrormsg(err.message);
        console.log(err.message);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isbutton ? (
          <Button
            variant="outline"
            className="font-normal text-gray-600 text-md"
          >
            Log In
          </Button>
        ) : (
          <p>Log In</p>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to your account</DialogTitle>
          <DialogDescription>
            Enter your email below to login to your account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="col-span-3"
              onChange={(event) => {
                setValues((prev) => ({ ...prev, email: event.target.value }));
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              onChange={(event) => {
                setValues((prev) => ({
                  ...prev,
                  password: event.target.value,
                }));
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-4">
            <p className="font-semibold text-red-700">{errormsg}</p>
            <Button
              type="submit"
              onClick={handleGuest}
              disabled={submitButtonDisabled}
            >
              Guest
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={submitButtonDisabled}
            >
              Login
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
