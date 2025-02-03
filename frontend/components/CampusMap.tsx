import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const CampusMap = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
      <Card>
        <CardHeader>
          <CardTitle>Campus Map</CardTitle>
          <CardDescription>
            Plan your visit to our beautiful campus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.00425878459419!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80da61087cc12a!2sNew%20York%20University!5e0!3m2!1sen!2sus!4v1658849951489!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="mt-4 flex justify-center">
            <Button>Download Campus Map</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CampusMap;
