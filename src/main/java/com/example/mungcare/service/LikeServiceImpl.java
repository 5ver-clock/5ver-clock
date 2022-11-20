package com.example.mungcare.service;

import com.example.mungcare.dto.LikeDTO;
import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Like;
import com.example.mungcare.entity.Member;
import com.example.mungcare.repository.BoardRepository;
import com.example.mungcare.repository.LikeId;
import com.example.mungcare.repository.LikeRepository;
import com.example.mungcare.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor //JPA 처리를 위한 의존성 주입
@Log4j2
public class LikeServiceImpl implements LikeService {
    private LikeRepository likeRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public Integer addLike(String id, Integer bNo) { //좋아요 체크
        try {
            Member member = memberRepository.findById(id).get();
            Board board = boardRepository.findById(bNo).get();

            LikeId ld = new LikeId(member, board); //복합키
            Optional<Like> result = likeRepository.findById(ld);
            if(result.isPresent()) { //null이 아니면
                Like like = result.get();
                Integer addOrDel = like.getCLike(); //좋아요 했는지, 안했는지
                Integer re = like.likeAddDel(addOrDel); //좋아요 여부에 따라 삭제 또는 좋아요

                likeRepository.save(like);
                return re;
            }
            else { //null일때
                LikeDTO likeDTO = new LikeDTO(id, bNo, 1);
                Like like = dtoToEntity(likeDTO);
                System.out.println("=============================" + like);
                likeRepository.save(like);

                board.updateLikeCount(3); //해당 게시물의 좋아요 수 증가
                boardRepository.save(board);
                return 1;
            }
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return null;
        }

    }

//    private boolean checkLike(String id, Integer bNo) {
//        return likeRepository.findByBoardBNoAndMemberId(id, bNo).isPresent();
//    }
}
