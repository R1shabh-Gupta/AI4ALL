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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

type appProps = {
  type: "default";
  onIsLoggedIn: (value: boolean) => void;
  isbutton: boolean;
};

export function Signup({ type, onIsLoggedIn, isbutton = true }: appProps) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errormsg, setErrormsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
    if (!values.name || !values.email || !values.password) {
      setErrormsg("Fill all fields");
      return;
    }
    setErrormsg("");
    console.log(values);
    setSubmitButtonDisabled(false);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        onIsLoggedIn(true);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
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
            className="bg-[#862FE7] text-white"
            variant={`${type ? type : "outline"}`}
          >
            Sign up for free
          </Button>
        ) : (
          <p>Sign Up</p>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Enter your email below to create your account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Rishabh Gupta"
              className="col-span-3"
              onChange={(event) => {
                setValues((prev) => ({ ...prev, name: event.target.value }));
              }}
            />
          </div>
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
              onClick={handleSubmit}
              disabled={submitButtonDisabled}
            >
              Sign Up
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
