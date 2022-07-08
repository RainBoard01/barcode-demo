import { Card, SegmentedControl, Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

export const Demo = (): JSX.Element => {
  const [adding, setAdding] = useState("adding");
  const [lastScannedBarCode, setLastScannedBarCode] = useState("");
  const [listOfScannedBarCodes, setListOfScannedBarCodes] = useState([]);

  const onGlobalKeyPressed = (e: { which: any; keyCode: any }) => {
    let charCode = typeof e.which == "number" ? e.which : e.keyCode;

    if (charCode != 13) {
      setLastScannedBarCode(lastScannedBarCode + String.fromCharCode(charCode));
    } else {
      let lastCode = lastScannedBarCode;

      if (checkIfScannedCodeExists(lastCode) == false && adding === "adding") {
        setListOfScannedBarCodes([...listOfScannedBarCodes, lastCode]);
      } else if (
        checkIfScannedCodeExists(lastCode) == true &&
        adding === "sustract"
      ) {
        setListOfScannedBarCodes(
          listOfScannedBarCodes.filter((el) => el !== lastCode)
        );
      }
      setLastScannedBarCode("");
    }
  };

  const checkIfScannedCodeExists = (scannedCode: string) => {
    let foundIt = false;

    for (let i = 0; i < listOfScannedBarCodes.length; i++) {
      if (listOfScannedBarCodes[i] == scannedCode) foundIt = true;
    }

    return foundIt;
  };

  document.onkeydown = onGlobalKeyPressed;
  return (
    <Stack>
      <SegmentedControl
        size="lg"
        value={adding}
        onChange={setAdding}
        data={[
          { label: "Restar", value: "sustract" },
          { label: "Añadir", value: "adding" },
        ]}
      />
      {listOfScannedBarCodes.map((elem, index) => (
        <Card p="lg" shadow="lg" key={index}>
          <Title order={4}>{elem}</Title>
        </Card>
      ))}
    </Stack>
  );
};
