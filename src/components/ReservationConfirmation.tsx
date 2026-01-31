import { motion } from "framer-motion";
import { Calendar, Clock, Heart, Wine, Sparkles, Video, Download, CalendarPlus } from "lucide-react";
import FloatingPhotos from "./FloatingPhotos";

const ReservationConfirmation = () => {
  const details = [
    {
      icon: Calendar,
      label: "Date",
      value: "14th February 2026",
    },
    {
      icon: Clock,
      label: "Time",
      value: "18:00 European Time",
    },
    {
      icon: Video,
      label: "Location",
      value: "Google Meet link will be sent closer to the date",
    },
  ];

  const notes = [
    { icon: Sparkles, text: "Please be ready on time" },
    { icon: Wine, text: "Bring a bottle of wine, a symbol of love" },
    { icon: Heart, text: "Food will be free for you as you are on a date" },
    { icon: Sparkles, text: "Food will be ordered closer to the time" },
  ];

  // Generate Google Calendar link for Feb 14, 2026 at 18:00 CET
  const generateCalendarLink = () => {
    const startDate = "20260214T170000Z"; // 18:00 CET = 17:00 UTC
    const endDate = "20260214T200000Z"; // 3 hours later
    const title = encodeURIComponent("Valentine's Date with Rishabh 💕");
    const description = encodeURIComponent(
      "Our special Valentine's date! Remember to:\n- Dress up and make it special\n- Have a bottle of wine ready\n- Google Meet link will be sent closer to the date"
    );
    const location = encodeURIComponent("Google Meet (link TBD)");
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;
  };

  // Generate ICS file for calendar download
  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Valentine Date//EN
BEGIN:VEVENT
DTSTART:20260214T170000Z
DTEND:20260214T200000Z
SUMMARY:Valentine's Date with Rishabh 💕
DESCRIPTION:Our special Valentine's date! Remember to dress up\\, have wine ready\\, and check for the Google Meet link closer to the date.
LOCATION:Google Meet (link TBD)
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "valentines-date-2026.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download reservation as PDF-style (using print)
  const downloadReservation = () => {
    window.print();
  };

  return (
    <>
      <FloatingPhotos />
      <motion.div
        className="w-full max-w-lg mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="card-romantic text-center mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="p-5 rounded-full bg-primary/10">
              <Heart className="w-12 h-12 text-primary" fill="currentColor" />
            </div>
          </motion.div>

          <motion.h2
            className="font-display text-3xl md:text-4xl gradient-text mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Reservation Confirmed
          </motion.h2>

          <motion.p
            className="text-muted-foreground font-body mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            It will be a night of love, laughter, and romance 💕
          </motion.p>

          <div className="space-y-4 mb-8">
            {details.map((detail, index) => (
              <motion.div
                key={detail.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <detail.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground font-body">
                    {detail.label}
                  </p>
                  <p className="font-medium text-foreground font-body">
                    {detail.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-2 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <a
              href={generateCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-body"
            >
              <CalendarPlus className="w-4 h-4" />
              Add to Google Calendar
            </a>
            <button
              onClick={downloadICS}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-body"
            >
              <Download className="w-4 h-4" />
              Download Calendar File
            </button>
          </motion.div>

          <motion.button
            onClick={downloadReservation}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm border border-primary/30 text-foreground rounded-lg hover:bg-primary/5 transition-colors font-body mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Download className="w-4 h-4" />
            Download Reservation as PDF
          </motion.button>

          <motion.div
            className="border-t border-border pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <h4 className="font-display text-lg text-foreground mb-4">
              Notes for the evening ✨
            </h4>
            <div className="space-y-3">
              {notes.map((note, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-left"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <note.icon className="w-4 h-4 text-accent flex-shrink-0" />
                  <p className="text-sm text-muted-foreground font-body">
                    {note.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <p className="text-sm text-muted-foreground font-body">
              🎨 <strong>Theme:</strong> Dress up! Make it special.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ReservationConfirmation;
