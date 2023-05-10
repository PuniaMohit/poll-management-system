export const addPollOption = (
  pollOptionInput,
  formValues,
  setFormErrors,
  setFormValues,
  setPollOptionInput
) => {
  if (pollOptionInput.trim() !== "") {
    if (formValues.pollOptions.length >= 3) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        optionError: "You can only enter 3 options maximum.",
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        pollOptions: [
          ...prevValues.pollOptions,
          { optionTitle: pollOptionInput },
        ],
      }));
      setPollOptionInput("");
    }
  } else {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      optionError: "Enter poll option",
    }));
  }
};

export const addNewPoll = (
  formValues,
  setFormErrors,
  setFormValues,
  addPoll,
  setPollOptionInput,
  setShow,
  pollOptionInput,
  dispatch
) => {
  const titleRegex = /^.{8,}$/;
  if (formValues.pollTitle.trim() === "") {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      titleError: "Enter poll title",
    }));
  } else if (!titleRegex.test(formValues.pollTitle.trim())) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      titleError: "Title should be of minimum 8 characters",
    }));
  }
  if (pollOptionInput === "") {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      optionError: "Enter option",
    }));
  } else if (formValues.pollOptions.length < 3) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      optionError: "Enter at least three options",
    }));
  }
  if (formValues.pollOptions.length === 3) {
    const newPoll = {
      title: formValues.pollTitle,
      options: formValues.pollOptions,
    };
    dispatch(addPoll(newPoll));
    setFormValues({ pollTitle: "", pollOptions: [] });
    setFormErrors({ titleError: "", optionError: "" });
    setPollOptionInput("");
    setShow(false);
  }
};
