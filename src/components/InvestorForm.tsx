"use client";
import { FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function InvestorForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [file, setFile] = useState("");

  const investorFormFields = [
    {
      label: "First name",
      name: "firstName",
      type: "text",
      change: (e:any) => setFirstName(e.target.value),
      st: firstName,
    },
    {
      label: "Last name",
      name: "lastName",
      type: "text",
      change: (e:any) => setLastName(e.target.value),
      st: lastName,
    },
    {
      label: "Date of birth",
      name: "dateOfBirth",
      type: "date",
      change: (e:any) => setDateOfBirth(e.target.value),
      st: dateOfBirth,
    },
    {
      label: "Phone number",
      name: "phoneNumber",
      type: "text",
      change: (e:any) => setPhoneNumber(e.target.value),
      st: phoneNumber,
    },
    {
      label: "Street address",
      name: "streetAddress",
      type: "text",
      change: (e:any) => setStreetAddress(e.target.value),
      st: streetAddress,
    },
    {
      label: "State",
      name: "state",
      type: "text",
      change: (e:any) => setState(e.target.value),
      st: state,
    },
    {
      label: "Zip Code",
      name: "zipCode",
      type: "text",
      change: (e:any) => setZipCode(e.target.value),
      st: zipCode,
    },
    {
      label: "File",
      name: "file",
      type: "file",
      change: (e:any) => setFile(e.target.value),
      st: file,
    },
  ];

  const showToastMessage = (res: any) => {
    if (res.investor) {
      toast.success(
        `${res.investor.firstName} ${res.investor.lastName} created`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        },
      );
    } else {
      toast.error(`Failed to create Investor`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const response = await fetch("/api/investor", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("response is ", data)

    if(data.investor){
        setFirstName("")
        setLastName("")
        setDateOfBirth("")
        setPhoneNumber("")
        setStreetAddress("")
        setState("")
        setZipCode("")
        setFile("")
    }
    showToastMessage(data);
  }


  return (
    <>
    <ToastContainer />
    <form onSubmit={onSubmit}>
      {investorFormFields.map(({ label, name, type, st, change }) => (
        <div className="mb-6" key={name}>
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
          <input
            required
            type={type}
            name={name}
            onChange={change}
            value={st}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
    </>
  );
}
