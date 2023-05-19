import chatroomModel from "../models/chatroomModel.js";
import infoLessonModel from "../models/infoLessonModel.js";
import journalModel from "../models/journalModel.js";
import lessonModel from "../models/lessonModel.js";
import scheduleModel from "../models/scheduleModel.js";

class ScheduleController {
    async setschedule(req, res, next) {
        try {
            const { date, info_lessons } = req.body;
            console.log("date", date);
            const old_schedule = await scheduleModel.findOne({ date }).populate({
                path: "info_lessons",
                populate: {
                    path: "journal",
                    populate: {
                        path: "children.child",
                        select: "name",
                    },
                },
            });
            console.log(old_schedule);
            if(old_schedule){
                for(let info of old_schedule.info_lessons){
                    await journalModel.deleteOne({_id: info.journal})
                    await infoLessonModel.deleteOne({_id: info._id})
                }
            }
            const new_info_lessons = [];
            for (let info_lesson of info_lessons) {
                const journal = await journalModel.create({
                    children: info_lesson.journal.children.map((ch) => ({
                        child: ch.child._id,
                        rating: ch.rating,
                        visit: ch.visit,
                    })),
                });
                const info = await infoLessonModel.create({
                    date,
                    time: info_lesson.time,
                    name: info_lesson.name,
                    desc: info_lesson.desc,
                    journal: journal._id,
                });
                new_info_lessons.push(info);
            }
            if (!old_schedule) {
                const new_schedule = await scheduleModel.create({
                    date,
                    info_lessons: new_info_lessons.map((info) => info._id),
                });
                const schedule = await scheduleModel
                    .findById(new_schedule._id)
                    .populate({
                        path: "info_lessons",
                        populate: {
                            path: "journal",
                            populate: {
                                path: "children.child",
                                select: "name",
                            },
                        },
                    });
                console.log(1, schedule);
                res.json(schedule);
                return;
            }
            await scheduleModel.updateOne(
                { date },
                {
                    $set: {
                        info_lessons: new_info_lessons.map((info) => info._id),
                    },
                }
            );
            const schedule = await scheduleModel
                .findOne({date})
                .populate({
                    path: "info_lessons",
                    populate: {
                        path: "journal",
                        populate: {
                            path: "children.child",
                            select: "name",
                        },
                    },
                });
            console.log(2, schedule);
            res.json(schedule);
            return;
        } catch (err) {
            next(err);
        }
    }

    async getschedule(req, res, next) {
        try {
            const { date } = req.body;
            console.log("date", date);
            let schedule = await scheduleModel.findOne({ date }).populate({
                path: "info_lessons",
                populate: {
                    path: "journal",
                    populate: {
                        path: "children.child",
                        select: "name",
                    },
                },
            });
            console.log(3, schedule);
            res.json(schedule);
        } catch (err) {
            next(err);
        }
    }
}

export default new ScheduleController();
