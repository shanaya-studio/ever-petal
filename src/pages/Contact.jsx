import useThemeStore from "../store/themeStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod Validation Schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().min(1, "Email is required").email("Enter a valid email"),

  subject: z.string().min(1, "Please select a subject"),

  message: z.string().min(1, "Message is required"),

  agree: z.boolean().refine((value) => value === true, {
    message: "You must agree before submitting",
  }),
});
export default function Contact() {
  // Form data
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      agree: false,
    },
  });
  // Get theme
  const theme = useThemeStore((state) => state.theme);

  // Submit form
  const onSubmit = (data) => {
    console.log("Contact Form:", data);
    alert("Message submitted successfully!");
    reset();
  };

  return (
    <section
      className={
        theme === "dark"
          ? "min-h-screen bg-gray-900 text-white py-16 px-6"
          : "min-h-screen bg-pink-50 text-gray-900 py-16 px-6"
      }
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            Contact <span className="text-pink-500">Us</span>
          </h1>

          <p
            className={
              theme === "dark"
                ? "mt-4 text-white text-lg max-w-2xl mx-auto"
                : "mt-4 text-gray-600 text-lg max-w-2xl mx-auto"
            }
          >
            Have a question or want to order beautiful flowers? We would love to
            hear from you.
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div
            className={
              theme === "dark"
                ? "bg-gray-800 rounded-2xl shadow-md p-8"
                : "bg-white rounded-2xl shadow-md p-8"
            }
          >
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Get In Touch
            </h2>

            <p
              className={
                theme === "dark"
                  ? "text-white leading-7 mb-8"
                  : "text-gray-600 leading-7 mb-8"
              }
            >
              Feel free to contact us for flower orders, bouquet customization,
              delivery information, or any other questions.
            </p>

            {/* Address */}
            <div className="flex items-start gap-4 mb-6">
              <div className="text-3xl">📍</div>

              <div>
                <h3 className="font-bold text-green-700">Address</h3>

                <p
                  className={theme === "dark" ? "text-white" : "text-gray-600"}
                >
                  Main Market, Your City
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 mb-6">
              <div className="text-3xl">📞</div>

              <div>
                <h3 className="font-bold text-green-700">Phone</h3>

                <p
                  className={theme === "dark" ? "text-white" : "text-gray-600"}
                >
                  +92 300 1234567
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 mb-6">
              <div className="text-3xl">✉️</div>

              <div>
                <h3 className="font-bold text-green-700">Email</h3>

                <p
                  className={theme === "dark" ? "text-white" : "text-gray-600"}
                >
                  info@everpetal.com
                </p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-4">
              <div className="text-3xl">🕐</div>

              <div>
                <h3 className="font-bold text-green-700">Opening Hours</h3>

                <p
                  className={theme === "dark" ? "text-white" : "text-gray-600"}
                >
                  Monday - Saturday: 9:00 AM - 8:00 PM
                </p>

                <p
                  className={theme === "dark" ? "text-white" : "text-gray-600"}
                >
                  Sunday: 10:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={
              theme === "dark"
                ? "bg-gray-800 rounded-2xl shadow-md p-8"
                : "bg-white rounded-2xl shadow-md p-8"
            }
          >
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className={
                    theme === "dark"
                      ? "block text-white font-medium mb-2"
                      : "block text-gray-700 font-medium mb-2"
                  }
                >
                  Your Name
                </label>

                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your name"
                  className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white placeholder-gray-300"
                      : "bg-white text-gray-900"
                  } ${errors.name ? "border-red-500" : "border-gray-300"}`}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  className={
                    theme === "dark"
                      ? "block text-white font-medium mb-2"
                      : "block text-gray-700 font-medium mb-2"
                  }
                >
                  Email
                </label>

                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white placeholder-gray-300"
                      : "bg-white text-gray-900"
                  } ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  className={
                    theme === "dark"
                      ? "block text-white font-medium mb-2"
                      : "block text-gray-700 font-medium mb-2"
                  }
                >
                  Subject
                </label>

                <select
                  {...register("subject")}
                  className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-900"
                  } ${errors.subject ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select a subject</option>

                  <option value="General Inquiry">General Inquiry</option>

                  <option value="Support">Support</option>

                  <option value="Feedback">Feedback</option>

                  <option value="Other">Other</option>
                </select>

                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  className={
                    theme === "dark"
                      ? "block text-white font-medium mb-2"
                      : "block text-gray-700 font-medium mb-2"
                  }
                >
                  Message
                </label>

                <textarea
                  {...register("message")}
                  rows="5"
                  placeholder="Write your message..."
                  className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 resize-none ${
                    theme === "dark"
                      ? "bg-gray-700 text-white placeholder-gray-300"
                      : "bg-white text-gray-900"
                  } ${errors.message ? "border-red-500" : "border-gray-300"}`}
                ></textarea>

                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Checkbox */}
              <div>
                <label
                  className={
                    theme === "dark"
                      ? "flex items-center gap-2 text-white"
                      : "flex items-center gap-2 text-gray-700"
                  }
                >
                  <input
                    type="checkbox"
                    {...register("agree")}
                    className="w-4 h-4 accent-pink-500"
                  />
                  I agree to the terms
                </label>

                {errors.agree && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.agree.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-3 rounded-full font-medium hover:bg-pink-600 transition"
              >
                Send Message 💌
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
