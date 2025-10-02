import React, { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

const ApplicationForm = () => {
  // form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    phone: "",
    address: "",
    city: "",
    education: "",
    hourlyWage: "",
    zipCode: "",
    skills: "",
    services: "",
    vehicleType: "",
    paymentPreference: "",
    schedule: [],
    certification: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  //   Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "schedule") {
        setFormData((prev) => {
          const newSchedule = [...prev.schedule];
          if (checked) {
            newSchedule.push(value);
          } else {
            const index = newSchedule.indexOf(value);
            if (index > -1) {
              newSchedule.splice(index, 1);
            }
          }
          return { ...prev, schedule: newSchedule };
        });
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //   Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitSuccess(false);

    // Validate phone format (123-456-7890)
    if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
      alert("Phone must be in 123-456-7890 format");
      setLoading(false);
      return;
    }

    // Validate ZIP code (5 digits)
    if (!/^\d{5}$/.test(formData.zipCode)) {
      alert("ZIP code must be 5 digits");
      setLoading(false);
      return;
    }

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Validate new fields
    if (!formData.vehicleType) {
      alert("Please select your vehicle type");
      setLoading(false);
      return;
    }

    if (!formData.paymentPreference) {
      alert("Please select your payment preference");
      setLoading(false);
      return;
    }

    if (formData.schedule.length === 0) {
      alert("Please select at least one available schedule");
      setLoading(false);
      return;
    }

    try {
      // Submit to Supabase
      const { data, error } = await supabase
        .from("job_applications")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            gender: formData.gender,
            dob: formData.dob,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            zip_code: formData.zipCode,
            education: formData.education,
            hourly_wage: formData.hourlyWage,
            skills: formData.skills,
            services: formData.services,
            vehicle_type: formData.vehicleType,
            payment_preference: formData.paymentPreference,
            schedule: formData.schedule.join(", "),
            certification: formData.certification,
          },
        ])
        .select();

      if (error) throw error;

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        gender: "",
        dob: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        education: "",
        hourlyWage: "",
        skills: "",
        services: "",
        vehicleType: "",
        paymentPreference: "",
        schedule: [],
        certification: false,
      });
    } catch (error) {
      alert("Error submitting application: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-8 grid md:grid-cols-2 gap-6"
      >
        {/* Personal Information */}
        <div className="space-y-6 md:col-span-2">
          <h3 className="text-xl font-semibold text-[#6017B4] border-b border-gray-200 pb-2">
            Personal Information
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Gender*</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date of Birth*</label>
              <input
                type="date"
                name="dob"
                max={today}
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#6017B4] border-b border-gray-200 pb-2">
            Contact Information
          </h3>
          <div>
            <label className="block text-gray-700 mb-2">Email Address*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Phone Number*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Format: 123-456-7890</p>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">City*</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">ZIP Code*</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                pattern="[0-9]{5}"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
                required
              />
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#6017B4] border-b border-gray-200 pb-2">
            Professional Details
          </h3>
          <div>
            <label className="block text-gray-700 mb-2">
              Highest Education Level*
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
              required
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate">Doctorate</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Desired Hourly Wage /hr*
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                name="hourlyWage"
                value={formData.hourlyWage}
                onChange={handleChange}
                min="1"
                max="99"
                className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Must be between $1-$99</p>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Skills & Trainings*
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
              placeholder="List your relevant skills and certifications"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Services You Can Provide*
            </label>
            <textarea
              name="services"
              value={formData.services}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
              placeholder="Describe the services you offer"
              required
            ></textarea>
          </div>

          {/* New Fields */}
          <div>
            <label className="block text-gray-700 mb-2">Type of Vehicle*</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
              required
            >
              <option value="">Select your vehicle</option>
              <option value="No vehicle">No vehicle</option>
              <option value="Motorcycle or Scooter">
                Motorcycle or Scooter
              </option>
              <option value="Car">Car</option>
              <option value="Minivan or SUV">Minivan or SUV</option>
              <option value="Pickup truck">Pickup truck</option>
              <option value="Cargo van">Cargo van</option>
              <option value="Box Truck">Box Truck</option>
              <option value="Tow Truck">Tow Truck</option>
              <option value="Other">Other (please specify)</option>
            </select>
            {formData.vehicleType === "Other" && (
              <input
                type="text"
                name="vehicleTypeOther"
                value={formData.vehicleTypeOther}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
                placeholder="Please specify your vehicle type"
                required={formData.vehicleType === "Other"}
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Payment Preference*
            </label>
            <select
              name="paymentPreference"
              value={formData.paymentPreference}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
              required
            >
              <option value="">Select payment method</option>
              <option value="Cash">Cash</option>
              <option value="Direct deposit">Direct deposit</option>
              <option value="CashApp">CashApp</option>
              <option value="Venmo">Venmo</option>
              <option value="PayPal">PayPal</option>
              <option value="Other">Other (please specify)</option>
            </select>
            {formData.paymentPreference === "Other" && (
              <input
                type="text"
                name="paymentPreferenceOther"
                value={formData.paymentPreferenceOther}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6017B4] focus:border-transparent focus:outline-none transition"
                placeholder="Please specify your payment method"
                required={formData.paymentPreference === "Other"}
              />
            )}
          </div>
          {/* schedule */}
          <div>
            <label className="block text-gray-700 mb-2">
              Weekly Availability*
            </label>
            <div className="space-y-4">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ].map((day) => (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.005 }}
                  className="bg-gray-50 p-3 rounded-lg"
                >
                  <h4 className="font-medium text-gray-700 mb-2">{day}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      { value: `${day}-12am-4am`, label: "12am - 4am" },
                      { value: `${day}-4am-8am`, label: "4am - 8am" },
                      { value: `${day}-8am-12noon`, label: "8am - 12noon" },
                      { value: `${day}-12noon-4pm`, label: "12noon - 4pm" },
                      { value: `${day}-4pm-8pm`, label: "4pm - 8pm" },
                      { value: `${day}-8pm-12am`, label: "8pm - 12am" },
                    ].map((time) => (
                      <div key={time.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`schedule-${time.value}`}
                          name="schedule"
                          value={time.value}
                          checked={formData.schedule.includes(time.value)}
                          onChange={handleChange}
                          className="mr-2 rounded focus:ring-[#6017B4] focus:ring-2 focus:outline-none border-gray-300 text-[#6017B4]"
                        />
                        <label
                          htmlFor={`schedule-${time.value}`}
                          className="text-gray-700 text-sm"
                        >
                          {time.label}
                        </label>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`schedule-${day}-unavailable`}
                        name="schedule"
                        value={`${day}-Unavailable`}
                        checked={formData.schedule.includes(
                          `${day}-Unavailable`
                        )}
                        onChange={handleChange}
                        className="mr-2 rounded focus:ring-[#6017B4] focus:ring-2 focus:outline-none border-gray-300 text-[#6017B4]"
                      />
                      <label
                        htmlFor={`schedule-${day}-unavailable`}
                        className="text-gray-700 text-sm"
                      >
                        Unavailable
                      </label>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="certification"
              name="certification"
              checked={formData.certification}
              onChange={handleChange}
              required
              className="mr-2 h-5 w-5 rounded border-gray-300 text-[#6017B4] focus:ring-[#6017B4] focus:outline-none"
            />
            <label htmlFor="certification" className="text-gray-700">
              I certify that all information provided is accurate and complete.*
            </label>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#6017B4] to-[#8B2CE2] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 relative overflow-hidden"
            disabled={loading}
          >
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                ></motion.div>
                Submitting...
              </motion.div>
            ) : (
              <motion.span initial={{ opacity: 1 }}>
                Submit Application
              </motion.span>
            )}
          </motion.button>
        </div>
      </form>
      {/* Success Message */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Application submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplicationForm;
