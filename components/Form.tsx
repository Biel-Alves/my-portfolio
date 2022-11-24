/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import { PageInfo } from "../typings";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { Slide } from "react-toastify";
import { MessageValidationSchema } from "../validations/MessageValidation";
import { XCircleIcon } from "@heroicons/react/24/solid";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  pageInfo: PageInfo;
};

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

function FormComponent({ pageInfo }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(MessageValidationSchema) });

  const formRef: any = useRef<HTMLFormElement>();

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_qf0uwc9",
        "template_vqleujr",
        formRef.current,
        "TR66B9-_SuDIa6Jhg"
      )
      .then(
        (result) => {
          console.log(result);
          result.status === 200 ? formRef.current.reset() : null;
          result.status === 200 ? formRef.current[0].focus() : null;
        },
        (error) => {
          console.log(error.text);
          toast.error("👎 Something went wrong!", {
            position: "bottom-left",
            transition: Slide,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        }
      );
  };

  const toastMessage = async () => {
    let formData = {
      firstName: formRef.current[0].value,
      lastName: formRef.current[1].value,
      email: formRef.current[2].value,
      subject: formRef.current[3].value,
      message: formRef.current[4].value,
    };
    const result = await MessageValidationSchema.isValid(formData);
    result
      ? toast.success("👌 Message successfully sent!", {
          position: "bottom-left",
          transition: Slide,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        })
      : toast.error("👎 Message was not sent!", {
          position: "bottom-left",
          transition: Slide,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(sendEmail)}
      className="flex flex-col items-center w-fit mx-auto max-h-[400px] "
    >
      <div className="flex space-x-2">
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            {...register("firstName")}
            placeholder={pageInfo?.placeholderName}
            className="contactInput h-[50px] w-[275px]"
          />

          <div className="flex">
            <XCircleIcon
              className={`errorIcon ${errors.firstName?.message ? "show" : ""}`}
            />
            <p
              className={`errorMessage ${
                errors.firstName?.message ? "show" : ""
              }`}
            >
              {errors.firstName?.message}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="text"
            {...register("lastName")}
            placeholder={pageInfo?.placeholderSurname}
            className="contactInput h-[50px] w-[275px]"
          />

          <div className="flex">
            <XCircleIcon
              className={`errorIcon ${errors.lastName?.message ? "show" : ""}`}
            />
            <p
              className={`errorMessage ${
                errors.lastName?.message ? "show" : ""
              }`}
            >
              {errors.lastName?.message}
            </p>
          </div>
        </div>
      </div>

      <input
        type="email"
        {...register("email")}
        placeholder={pageInfo?.placeholderEmail}
        className="contactInput h-[40px]"
      />

      <div className="flex">
        <XCircleIcon
          className={`errorIcon ${errors.email?.message ? "show" : ""}`}
        />
        <p className={`errorMessage ${errors.email?.message ? "show" : ""}`}>
          {errors.email?.message}
        </p>
      </div>

      <input
        type="text"
        {...register("subject")}
        placeholder={pageInfo?.placeholderSubject}
        className="contactInput h-[40px]"
      />

      <div className="flex">
        <XCircleIcon
          className={`errorIcon ${errors.subject?.message ? "show" : ""}`}
        />
        <p className={`errorMessage ${errors.subject?.message ? "show" : ""}`}>
          {errors.subject?.message}
        </p>
      </div>

      <textarea
        {...register("message")}
        placeholder={pageInfo?.placeholderMessage}
        className="contactInput h-[150px]"
      />

      <div className="flex">
        <XCircleIcon
          className={`errorIcon ${errors.message?.message ? "show" : ""}`}
        />
        <p className={`errorMessage ${errors.message?.message ? "show" : ""}`}>
          {errors.message?.message}
        </p>
      </div>
      <button
        onClick={toastMessage}
        type="submit"
        className="w-[552px] uppercase bg-eerie dark:bg-honey py-5 px-10 rounded-md text-beige dark:text-eerie font-bold text-lg hover:bg-green-400 hover:text-black dark:hover:bg-green-700 dark:hover:text-honey hover:scale-[101%] transition-all duration-[0.5s]"
      >
        {pageInfo?.submitButton}
      </button>
      <ToastContainer
        position="bottom-left"
        transition={Slide}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </form>
  );
}

export default FormComponent;
