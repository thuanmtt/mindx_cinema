const THE_LOAI = {
  28: "Hành động", 12: "Phiêu lưu", 16: "Hoạt hình", 35: "Hài", 80: "Tội phạm",
  18: "Chính kịch", 10751: "Gia đình", 14: "Giả tưởng", 10749: "Lãng mạn",
  878: "Khoa học viễn tưởng", 53: "Giật gân", 9648: "Bí ẩn"
};

const PHIM_MAU = [
  {
    id: 27205, title: "Inception", original_title: "Inception",
    overview: "Dom Cobb là một tên trộm chuyên đánh cắp bí mật từ trong giấc mơ. Anh nhận nhiệm vụ cuối cùng: thay vì lấy đi, phải gieo một ý tưởng vào đầu người khác.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", release_date: "2010-07-15", vote_average: 8.4, genre_ids: [28, 878, 12]
  },
  {
    id: 157336, title: "Interstellar", original_title: "Interstellar",
    overview: "Khi Trái Đất dần không còn sống được, một nhóm phi hành gia du hành qua hố sâu không gian để tìm ngôi nhà mới cho nhân loại.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", release_date: "2014-11-05", vote_average: 8.4, genre_ids: [12, 18, 878]
  },
  {
    id: 155, title: "The Dark Knight", original_title: "The Dark Knight",
    overview: "Batman, cảnh sát Gordon và công tố viên Harvey Dent hợp sức dọn dẹp Gotham, cho đến khi tên tội phạm Joker gieo rắc hỗn loạn khắp thành phố.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", release_date: "2008-07-16", vote_average: 8.5, genre_ids: [18, 28, 80, 53]
  },
  {
    id: 129, title: "Vùng đất linh hồn", original_title: "Sen to Chihiro no Kamikakushi (Spirited Away)",
    overview: "Cô bé Chihiro lạc vào thế giới của các vị thần và phải làm việc trong nhà tắm kỳ lạ để cứu bố mẹ bị biến thành heo.",
    poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", release_date: "2001-07-20", vote_average: 8.5, genre_ids: [16, 10751, 14]
  },
  {
    id: 862, title: "Câu chuyện đồ chơi", original_title: "Toy Story",
    overview: "Cao bồi Woody là món đồ chơi yêu thích của cậu bé Andy, cho đến khi phi hành gia Buzz Lightyear xuất hiện và mọi thứ đảo lộn.",
    poster_path: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg", release_date: "1995-10-30", vote_average: 8.0, genre_ids: [16, 12, 10751, 35]
  },
  {
    id: 299534, title: "Avengers: Hồi kết", original_title: "Avengers: Endgame",
    overview: "Sau cú búng tay của Thanos, các Avengers còn lại tập hợp một lần cuối để đảo ngược thảm họa và cứu vũ trụ.",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg", release_date: "2019-04-24", vote_average: 8.2, genre_ids: [12, 878, 28]
  },
  {
    id: 324857, title: "Người Nhện: Vũ trụ mới", original_title: "Spider-Man: Into the Spider-Verse",
    overview: "Cậu học sinh Miles Morales trở thành Người Nhện và gặp những Người Nhện khác đến từ các vũ trụ song song.",
    poster_path: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg", release_date: "2018-12-06", vote_average: 8.4, genre_ids: [28, 12, 16, 878]
  },
  {
    id: 354912, title: "Coco: Hội ngộ diệu kỳ", original_title: "Coco",
    overview: "Cậu bé Miguel mê âm nhạc tình cờ lạc vào Vùng Đất Linh Hồn rực rỡ và khám phá bí mật của gia đình mình.",
    poster_path: "/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", release_date: "2017-10-27", vote_average: 8.2, genre_ids: [10751, 16, 14, 35]
  },
  {
    id: 372058, title: "Tên cậu là gì?", original_title: "Kimi no Na wa. (Your Name.)",
    overview: "Hai học sinh ở hai nơi xa lạ bỗng hoán đổi thân xác cho nhau trong giấc mơ và bắt đầu hành trình đi tìm nhau.",
    poster_path: "/q719jXXEzOoYaps6babgKnONONX.jpg", release_date: "2016-08-26", vote_average: 8.5, genre_ids: [10749, 16, 18]
  },
  {
    id: 14160, title: "Vút bay", original_title: "Up",
    overview: "Ông lão Carl buộc hàng nghìn quả bóng bay vào ngôi nhà để thực hiện ước mơ đến Nam Mỹ, kèm theo một vị khách không mời.",
    poster_path: "/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg", release_date: "2009-05-28", vote_average: 7.9, genre_ids: [16, 35, 10751, 12]
  },
  {
    id: 269149, title: "Phi vụ động trời", original_title: "Zootopia",
    overview: "Cô thỏ cảnh sát Judy Hopps hợp tác với cáo lừa đảo Nick Wilde để phá vụ án bí ẩn ở thành phố Zootopia.",
    poster_path: "/hlK0e0wAQ3VLuJcsfIYPvb4JVud.jpg", release_date: "2016-02-11", vote_average: 7.7, genre_ids: [16, 12, 10751, 35]
  },
  {
    id: 9502, title: "Kung Fu Gấu Trúc", original_title: "Kung Fu Panda",
    overview: "Chú gấu trúc Po lười biếng bất ngờ được chọn làm Thần Long Đại Hiệp và phải học võ để bảo vệ Thung lũng Bình Yên.",
    poster_path: "/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg", release_date: "2008-06-04", vote_average: 7.3, genre_ids: [16, 10751, 35, 28]
  }
];
