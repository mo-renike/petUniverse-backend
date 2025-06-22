import { sequelize, DataTypes } from "../config/db.db.js"; //sequelize instance from database
import AppointmentModel from "./appointment.model.js";
import DoctorModel from "./doctor.model.js";
import PetOwnerModel from "./petOwner.model.js";
import NotificationModel from "./notification.model.js";

const Appointment = AppointmentModel(sequelize, DataTypes);
const Doctor = DoctorModel(sequelize, DataTypes);
const PetOwner = PetOwnerModel(sequelize, DataTypes);
const Notification = NotificationModel(sequelize, DataTypes);

Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });
Appointment.belongsTo(PetOwner, { foreignKey: "petOwnerId" });
Appointment.hasMany(Notification, { foreignKey: "appointmentId" });

Notification.belongsTo(Appointment, { foreignKey: "appointmentId" });
Notification.belongsTo(Doctor, { foreignKey: "doctorId" });
Notification.belongsTo(PetOwner, { foreignKey: "petOwnerId" });

Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Doctor.hasMany(Notification, { foreignKey: "doctorId" });

PetOwner.hasMany(Appointment, { foreignKey: "petOwnerId" });
PetOwner.hasMany(Notification, { foreignKey: "petOwnerId" });

export { sequelize, Doctor, PetOwner, Appointment, Notification };
